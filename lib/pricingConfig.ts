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
// Small/single-item jobs assume you'll bundle them with other pickups
// before a dump run (see smallLoadDisposalDivisor below) rather than
// pricing every job for a worst-case standalone dump — an explicit choice
// to stay competitive for a new business building its customer base, at
// the cost of thinner margin on a small job that doesn't end up bundled.
export const pricingConfig = {
  // Minimum charge for any job, regardless of how small. A true floor for
  // degenerate cases only — coreCost normally exceeds it on its own, and
  // it deliberately does NOT also clamp priceLow (see lib/pricingEngine.ts)
  // so a competitive low end can actually show through instead of getting
  // silently overridden back up to this number.
  minimumCharge: 99,

  // The displayed range is the calculated price times these two
  // multipliers (e.g. a $200 calculated price shows as "$160 - $250").
  // low is intentionally more aggressive than high — the low end is what
  // customers compare against competitors' advertised "starting at"
  // prices, while the high end still needs to cover a harder version of
  // the same job (stairs, a heavier item, etc.) and keep the midpoint
  // (priceMid, roughly what most jobs actually settle at after review)
  // solidly above real cost. The final number is always personally
  // reviewed before it's real, so a low low end is a marketing lever, not
  // a promise to actually do every job at the bottom of the range.
  rangeSpread: { low: 0.8, high: 1.25 },

  // Our dump truck's approximate usable volume and safe payload weight.
  // Used only to compute the internal "how full is the truck" label for
  // your own notification email — never shown to the customer.
  truckCapacityCubicYards: 10,
  truckCapacityWeightLbs: 6000,

  // Assumed average density of mixed debris, used to convert weight into
  // "effective cubic yards" for heavy/dense loads (labor-time purposes
  // only — see disposal fee below for the actual dump-fee weight math).
  weightDensityLbsPerCuYd: 400,

  // Labor. Split into two pieces so the dump-run time can be shared across
  // bundled small jobs the same way the disposal fee is (see
  // smallLoadDisposalDivisor) — otherwise a small job would get its
  // dump-fee discounted but still get charged a full solo dump run's
  // worth of drive/wait time, which doesn't match reality if it's
  // actually riding along with other pickups.
  laborRatePerHour: 60, // in line with $50-90/hr researched for solo independent haulers in this market
  loadTimeHours: 0.5, // on-site loading + drive to/from the customer — always charged in full
  dumpRunHours: 0.5, // round-trip to Berky's + wait in line — shared per smallLoadDisposalDivisor below the disposal-fee-minimum weight line, charged in full above it (0.5 + 0.5 = 1 full hour matches the pre-split baseline for a standalone job — keep these two numbers summing to that if you adjust either one)
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

  // How many small jobs (ones that stay under disposalFeeMinimumLbs and
  // never trigger an extra-ton charge) you realistically expect to combine
  // into one dump run. The $108 minimum gets divided by this instead of
  // charged in full to each one — e.g. 2.5 means "roughly 2-3 small jobs
  // share one Berky's minimum." Only applies below the 1,000 lb line;
  // anything heavier pays the real per-ton cost in full, since a load
  // that size is less likely to leave room to combine with another stop.
  // Raise this if you're consistently bundling more jobs per run than
  // this assumes, lower it (toward 1) if a small job often ends up going
  // to the dump alone.
  smallLoadDisposalDivisor: 2.5,

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
