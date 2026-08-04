import { NextRequest, NextResponse } from 'next/server';
import { sendNotificationEmail } from '@/lib/sendEmail';
import { appendToSheet } from '@/lib/sendToSheet';
import { findItem } from '@/lib/items';
import { estimateJob } from '@/lib/pricingEngine';
import { computeFuelCost } from '@/lib/routeDistance';
import { getPublishedPrice } from '@/lib/publishedPricing';

type Photo = { dataUrl: string; name: string };

// Vercel's default body size limit for API routes is 4.5MB. Compressed
// photos (see lib/compressImage.ts) keep a typical submission well under
// that, but this is the ceiling to watch if photo count/quality changes.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, address, zip, city, contactPreference, propertyType,
      itemQuantities = {}, otherDescription, locations = [], conditions = [], dateOption, chosenDate,
      notes, photos = [], referralCode, skipItemList = false, unknownItemsNote = '' } = body ?? {};

    if (!name || !phone || !address || !zip) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const preferredDate = dateOption === 'choose' ? chosenDate : dateOption || '';

    const itemSummary = Object.entries(itemQuantities as Record<string, number>)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const label = id === 'other' && otherDescription ? otherDescription : findItem(id)?.label ?? id;
        return `${label} x${qty}`;
      })
      .join(', ');

    // Real three-leg mileage (business -> customer -> Berky's -> business)
    // and the fuel cost it implies, using the F-450's actual loaded/unloaded
    // MPG. Never throws/blocks — returns null if the route API isn't
    // configured or the address can't be resolved, in which case estimateJob
    // falls back to the flat fuelFlatFee exactly as before this feature.
    const routeFuel = await computeFuelCost(address, city, zip);

    const estimate = estimateJob({
      itemQuantities,
      accessConditions: conditions,
      fuelCostOverride: routeFuel?.fuelCost,
    });

    // What the customer actually saw (lib/publishedPricing.ts's flat item/
    // volume-tier table), vs. estimate.basePrice (the real cost-model
    // number, including access-condition surcharges). Flagged here so a
    // published price that undershoots real cost for this specific job
    // (e.g. a "Chair" quote that turned out to need stairs + a long carry)
    // doesn't get missed.
    const published = skipItemList ? null : getPublishedPrice(itemQuantities, estimate.truckFillFraction);
    const marginRisk = published ? published.low < estimate.basePrice : false;

    if (process.env.NODE_ENV !== 'production') {
      // Development-only debug breakdown — never shown to the customer,
      // never included in the API response, and skipped entirely in
      // production (the business owner still gets the real numbers via the
      // internal email section below, in every environment).
      console.log('[route-fuel debug]', {
        businessToCustomerMiles: routeFuel?.businessToCustomerMiles ?? null,
        customerToDumpMiles: routeFuel?.customerToDumpMiles ?? null,
        dumpToBusinessMiles: routeFuel?.dumpToBusinessMiles ?? null,
        totalRouteMiles: routeFuel?.totalRouteMiles ?? null,
        unloadedGallons: routeFuel?.unloadedGallons ?? null,
        loadedGallons: routeFuel?.loadedGallons ?? null,
        totalGallons: routeFuel?.totalGallons ?? null,
        fuelCost: routeFuel?.fuelCost ?? null,
        overheadFee: estimate.overheadFee,
        basePrice: estimate.basePrice,
        priceLow: estimate.priceLow,
        priceHigh: estimate.priceHigh,
        published,
        marginRisk,
      });
    }

    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || '—'}`,
      `Preferred contact: ${contactPreference || '—'}`,
      `Address: ${address}, ${city || ''} ${zip}`,
      `Property type: ${propertyType || '—'}`,
      skipItemList
        ? `Items: Customer skipped item list — ${unknownItemsNote || 'no description provided'}`
        : `Items: ${itemSummary || '—'}`,
      otherDescription ? `Other item details: ${otherDescription}` : null,
      `Item locations: ${(locations as string[]).join(', ') || '—'}`,
      `Access conditions: ${(conditions as string[]).join(', ') || 'None'}`,
      `Preferred date: ${preferredDate || '—'}`,
      `Notes: ${notes || '—'}`,
      `Photos attached: ${photos.length}`,
      referralCode ? `Referral code: ${referralCode}` : null,
      '',
      published
        ? `Published price shown to customer: $${published.low} - $${published.high} (${published.source === 'item' ? 'item price' : published.label})`
        : null,
      marginRisk
        ? `⚠ MARGIN RISK: published low end ($${published?.low}) is below this job's real cost-plus-margin price ($${estimate.basePrice}) — review before confirming.`
        : null,
      '--- Internal cost estimate (not shown to customer) ---',
      `Truck fill: ${estimate.truckFillLabel} (${estimate.effectiveCuYd} effective cu yd, ${estimate.weightLbs} lbs)`,
      `Estimated labor: ${estimate.laborHours} hrs ($${estimate.laborCost})`,
      `Estimated disposal fee: $${estimate.disposalFee}`,
      routeFuel
        ? `Route: ${routeFuel.businessToCustomerMiles}mi to customer, ${routeFuel.customerToDumpMiles}mi to Berky's (loaded), ${routeFuel.dumpToBusinessMiles}mi back — ${routeFuel.totalRouteMiles}mi total`
        : null,
      routeFuel
        ? `Fuel: ${routeFuel.unloadedGallons} gal unloaded + ${routeFuel.loadedGallons} gal loaded = ${routeFuel.totalGallons} gal — $${estimate.fuelFee}`
        : `Estimated fuel fee: $${estimate.fuelFee} (flat rate — route distance unavailable for this request)`,
      `Overhead recovery: $${estimate.overheadFee}`,
      `Real cost-model price range: $${estimate.priceLow} - $${estimate.priceHigh}${skipItemList ? ' (UNRELIABLE — customer skipped item list, price from photos instead)' : ''}`,
      `Estimated profit at midpoint: $${estimate.estimatedProfit}`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const attachments = (photos as Photo[]).map((p, i) => ({
      filename: p.name || `photo-${i + 1}.jpg`,
      content: p.dataUrl.split(',')[1] ?? '',
      encoding: 'base64' as const,
    }));

    const subjectEstimate = skipItemList
      ? 'photo review requested'
      : `est. $${published?.low}-$${published?.high}${marginRisk ? ' ⚠' : ''}`;

    const [emailSent] = await Promise.all([
      sendNotificationEmail({
        subject: `New estimate request from ${name} — ${subjectEstimate}`,
        text: lines,
        attachments,
      }),
      appendToSheet({
        type: 'Estimate',
        name,
        phone,
        email: email || '',
        address,
        city: city || '',
        zip,
        propertyType: propertyType || '',
        items: skipItemList ? 'Skipped — see photos/description' : itemSummary,
        otherDescription: otherDescription || '',
        skipItemList,
        unknownItemsNote: unknownItemsNote || '',
        locations: (locations as string[]).join(', '),
        conditions: (conditions as string[]).join(', '),
        preferredDate,
        notes: notes || '',
        photoCount: photos.length,
        referralCode: referralCode || '',
        truckFillLabel: estimate.truckFillLabel,
        effectiveCuYd: estimate.effectiveCuYd,
        weightLbs: estimate.weightLbs,
        laborHours: estimate.laborHours,
        disposalFee: estimate.disposalFee,
        fuelFee: estimate.fuelFee,
        overheadFee: estimate.overheadFee,
        businessToCustomerMiles: routeFuel?.businessToCustomerMiles ?? '',
        customerToDumpMiles: routeFuel?.customerToDumpMiles ?? '',
        dumpToBusinessMiles: routeFuel?.dumpToBusinessMiles ?? '',
        totalRouteMiles: routeFuel?.totalRouteMiles ?? '',
        unloadedGallons: routeFuel?.unloadedGallons ?? '',
        loadedGallons: routeFuel?.loadedGallons ?? '',
        totalGallons: routeFuel?.totalGallons ?? '',
        publishedLow: published?.low ?? '',
        publishedHigh: published?.high ?? '',
        pricingSource: published?.source ?? '',
        marginRisk: marginRisk ? 'Yes' : 'No',
        priceLow: estimate.priceLow,
        priceHigh: estimate.priceHigh,
        estimatedProfit: estimate.estimatedProfit,
      }),
    ]);

    if (!emailSent) {
      // GMAIL_USER / GMAIL_APP_PASSWORD not configured for this environment.
      console.log('New estimate request (email not configured):', lines);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Estimate submission error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
