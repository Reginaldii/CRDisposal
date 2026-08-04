// Computes the real three-leg driving distance for a job — business →
// customer → Berky's Transfer (dump) → business — and turns it into a fuel
// cost, using the actual F-450's loaded/unloaded MPG instead of a flat
// placeholder fee.
//
// SERVER-ONLY. This file reads the business address, dump address, and the
// Google API key from environment variables, and must only ever be
// imported from app/api/* route handlers — never from a client component
// or from lib/pricingConfig.ts / lib/pricingEngine.ts (both of which are
// also imported client-side for the live estimate preview). None of these
// values may reach the browser bundle:
//   - BUSINESS_ADDRESS / DUMP_ADDRESS (where the truck lives / dumps)
//   - GOOGLE_ROUTES_API_KEY
//   - UNLOADED_MPG / LOADED_MPG / FUEL_PRICE_PER_GALLON
//
// Every value here has a sane fallback default so the site still works
// (using the flat pricingConfig.fuelFlatFee instead) if these env vars
// aren't set — see computeFuelCost()'s null return.

const METERS_PER_MILE = 1609.344;

const routeConfig = {
  businessAddress: process.env.BUSINESS_ADDRESS || '15882 Kutztown Road, Mertztown, PA 19538',
  dumpAddress: process.env.DUMP_ADDRESS || '15 Breezy Park Drive, Fleetwood, PA 19522',
  unloadedMpg: Number(process.env.UNLOADED_MPG) || 9,
  loadedMpg: Number(process.env.LOADED_MPG) || 7,
  fuelPricePerGallon: Number(process.env.FUEL_PRICE_PER_GALLON) || 3.5,
};

export type FuelCostResult = {
  businessToCustomerMiles: number;
  customerToDumpMiles: number;
  dumpToBusinessMiles: number;
  totalRouteMiles: number;
  unloadedGallons: number;
  loadedGallons: number;
  totalGallons: number;
  fuelCost: number;
};

function round1(n: number) {
  return Math.round(n * 10) / 10;
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// Very small in-memory cache so repeat calls for the same address within a
// short window (e.g. a retried submission) don't re-hit the Routes API.
// Best-effort only — serverless instances don't share memory, so this
// isn't a substitute for a real cache, just a cheap win "when practical"
// per the spec.
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const routeCache = new Map<string, { result: FuelCostResult; expires: number }>();

function cacheKey(address: string, city: string, zip: string) {
  return `${address}|${city}|${zip}`.trim().toLowerCase();
}

/**
 * Looks up real driving mileage for the three-leg route and converts it to
 * a fuel cost using the configured loaded/unloaded MPG. Returns null (never
 * throws) if the API key isn't configured, the address can't be resolved,
 * or the request fails for any reason — callers should fall back to the
 * existing flat fuelFlatFee in that case rather than blocking the estimate.
 */
export async function computeFuelCost(
  address: string,
  city: string,
  zip: string
): Promise<FuelCostResult | null> {
  const apiKey = process.env.GOOGLE_ROUTES_API_KEY;
  if (!apiKey || !address || !zip) return null;

  const key = cacheKey(address, city, zip);
  const cached = routeCache.get(key);
  if (cached && cached.expires > Date.now()) return cached.result;

  // PA is implied — the site only serves the Lehigh Valley — so we don't
  // collect a state field on the form (keeps the existing address step
  // unchanged) and just append it here for geocoding.
  const customerAddress = `${address}, ${city || ''} ${zip}, PA`.replace(/\s+/g, ' ').trim();

  try {
    const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        // Only request exactly what we need — Google's Routes API requires
        // an explicit field mask on every request.
        'X-Goog-FieldMask': 'routes.legs.distanceMeters',
      },
      body: JSON.stringify({
        origin: { address: routeConfig.businessAddress },
        destination: { address: routeConfig.businessAddress },
        intermediates: [{ address: customerAddress }, { address: routeConfig.dumpAddress }],
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE',
        units: 'IMPERIAL',
      }),
      // Don't let a slow/hanging routing call block the estimate submission.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error('Routes API request failed:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const legs = data?.routes?.[0]?.legs;
    // One leg per hop: business->customer, customer->dump, dump->business.
    // Anything other than exactly 3 legs means an address didn't resolve.
    if (!Array.isArray(legs) || legs.length !== 3) return null;

    const businessToCustomerMiles = round1(legs[0].distanceMeters / METERS_PER_MILE);
    const customerToDumpMiles = round1(legs[1].distanceMeters / METERS_PER_MILE);
    const dumpToBusinessMiles = round1(legs[2].distanceMeters / METERS_PER_MILE);

    // Leg 1 (business -> customer) and leg 3 (dump -> business) are
    // unloaded; leg 2 (customer -> dump) is loaded.
    const unloadedGallons = round2((businessToCustomerMiles + dumpToBusinessMiles) / routeConfig.unloadedMpg);
    const loadedGallons = round2(customerToDumpMiles / routeConfig.loadedMpg);
    const totalGallons = round2(unloadedGallons + loadedGallons);
    const fuelCost = round2(totalGallons * routeConfig.fuelPricePerGallon);

    const result: FuelCostResult = {
      businessToCustomerMiles,
      customerToDumpMiles,
      dumpToBusinessMiles,
      totalRouteMiles: round1(businessToCustomerMiles + customerToDumpMiles + dumpToBusinessMiles),
      unloadedGallons,
      loadedGallons,
      totalGallons,
      fuelCost,
    };

    routeCache.set(key, { result, expires: Date.now() + CACHE_TTL_MS });
    return result;
  } catch (err) {
    console.error('Route distance lookup failed:', err);
    return null;
  }
}
