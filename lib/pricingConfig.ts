// Every dollar figure and assumption the estimate engine uses lives here.
// Update prices, fees, and truck assumptions here — never in the pricing
// logic itself (lib/pricingEngine.ts).
//
// "Effective cubic yards" = whichever is larger of the load's actual
// volume, or its weight converted to an equivalent volume using
// weightDensityLbsPerCuYd. Used for labor time and the internal truck-fill
// label — NOT for disposal fee, which is billed by real weight (see below).
//
// Numbers below reflect Berky's Transfer's actual fee schedule and this
// business's real monthly overhead (loan + insurance), reviewed 2026-08.
// "Price safe" philosophy: every job is priced to be profitable even in
// the worst case — a single standalone dump run — since a new operation
// doesn't have route density yet to reliably batch multiple pickups per
// dump run. If/when batching small jobs together becomes routine, treat
// the disposal-cost savings as bonus margin rather than lowering these
// numbers, unless you're confident that'll hold up on a slow day too.
export const pricingConfig = {
  // Minimum charge for any job, regardless of how small. Deliberately set
  // below the typical real-world minimum job cost (~$250, see below) — it
  // mostly exists as a floor for degenerate cases, since coreCost normally
  // exceeds it on its own.
  minimumCharge: 225,

  // The displayed range is the calculated price times these two
  // multipliers (e.g. a $300 calculated price shows as "$270 - $345").
  rangeSpread: { low: 0.9, high: 1.15 },

  // Our dump truck's approximate usable volume and safe payload weight.
  // Used only to compute the internal "how full is the truck" label for
  // your own notification email — never shown to the customer.
  truckCapacityCubicYards: 10,
  truckCapacityWeightLbs: 6000,

  // Assumed average density of mixed debris, used to convert weight into
  // "effective cubic yards" for heavy/dense loads (labor-time purposes
  // only — see disposal fee below for the actual dump-fee weight math).
  weightDensityLbsPerCuYd: 400,

  // Labor. baseLaborHours covers loading time AND the realistic minimum
  // total time any job takes once you include the actual drive to Berky's,
  // waiting in line, and driving back — not just on-site loading.
  laborRatePerHour: 60,
  baseLaborHours: 1,
  laborHoursPerEffectiveCubicYard: 0.15,

  // Disposal fee — billed by REAL WEIGHT, matching Berky's actual fee
  // schedule: a flat minimum for anything up to disposalFeeMinimumLbs,
  // then a flat additional charge per full or partial ton beyond that.
  // This is a step function, not a smooth per-cubic-yard rate — a single
  // light item costs the same $108 minimum at the dump as anything else
  // under 1,000 lbs. See lib/pricingEngine.ts for the exact formula.
  disposalFeeMinimum: 108,
  disposalFeeMinimumLbs: 1000,
  disposalFeePerAdditionalTon: 108,
  disposalFeeTonLbs: 2000,

  // Flat placeholder fuel fee — only used as a fallback when the real
  // distance-based calculation (lib/routeDistance.ts) isn't configured or
  // fails for a given request. See README's "Real fuel-cost calculation"
  // section for the env vars that drive the real number.
  fuelFlatFee: 25,

  // Fixed monthly overhead (truck loan + vehicle insurance + business
  // liability insurance + a maintenance reserve + misc), divided by an
  // assumed jobs-per-month volume, recovered as a flat add per job. This
  // is the number to revisit whenever loan/insurance costs or your actual
  // job volume change — see README's "Pricing & overhead" section.
  overheadPerJob: 45,

  // Extra charges/multipliers for access conditions. Percentages apply to
  // the base calculated price; disassemblyRequired is a flat dollar add.
  accessConditionAdjustments: {
    stairs: 0.1,
    longCarry: 0.1,
    elevator: 0.05,
    narrowHallway: 0.1,
    heavyItems: 0.15,
    disassemblyRequired: 40,
  },
};
