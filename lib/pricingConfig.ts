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

  // Labor. Split into three pieces so the shareable portions (dump-run time
  // AND drive-to/from-customer time) can be discounted for jobs that
  // realistically ride along with other pickups — see smallLoadDisposalDivisor
  // and travelSharingDivisor below. Only on-site load time never shares,
  // since physically loading each customer's items is per-job no matter how
  // the route is built.
  laborRatePerHour: 60, // in line with $50-90/hr researched for solo independent haulers in this market
  onSiteLoadHours: 0.25, // physically loading the items at the customer's place — always charged in full
  travelHours: 0.25, // driving between the business and the customer — shared per travelSharingDivisor when the job can realistically be routed with another nearby stop
  dumpRunHours: 0.5, // round-trip to Berky's + wait in line — shared per smallLoadDisposalDivisor below the disposal-fee-minimum weight line, charged in full above it (onSiteLoadHours + travelHours + dumpRunHours = 1 full hour matches the pre-split baseline for a standalone job — keep these three numbers summing to that if you adjust any of them)
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
  // never trigger an extra-ton charge, AND leave enough room in the truck —
  // see bundleFillFractionMax below) you realistically expect to combine
  // into one dump run. The $108 minimum gets divided by this instead of
  // charged in full to each one — e.g. 2.5 means "roughly 2-3 small jobs
  // share one Berky's minimum." Raise this if you're consistently bundling
  // more jobs per run than this assumes, lower it (toward 1) if a small
  // job often ends up going to the dump alone.
  smallLoadDisposalDivisor: 2.5,

  // Average number of nearby jobs served in one truck circuit before
  // returning to base (e.g. business -> customer A -> customer B -> dump ->
  // business instead of a dedicated round trip per customer). Discounts the
  // shareable travel portion of labor time (travelHours) and fuel below —
  // NOT onSiteLoadHours or the customer-to-dump driving captured in fuel's
  // loaded leg, since those still happen per job regardless of routing.
  // Gated by the same bundleability check as smallLoadDisposalDivisor (see
  // isBundleable in lib/pricingEngine.ts): a job has to be both light AND
  // leave room in the truck to realistically ride along with another stop.
  travelSharingDivisor: 2,

  // A job only shares a dump run / route with others if there's actually
  // room left in the truck for their stuff — a "full truck" job of light
  // furniture fills the truck alone even though it's under the weight
  // line, so it can't realistically bundle with another customer's pickup.
  // isBundleable in lib/pricingEngine.ts requires truckFillFraction to stay
  // at or under this in addition to the weight check.
  bundleFillFractionMax: 0.4,

  // Flat placeholder fuel fee — only used as a fallback when the real
  // distance-based calculation (lib/routeDistance.ts) isn't configured or
  // fails for a given request. See README's "Real fuel-cost calculation"
  // section for the env vars that drive the real number. Represents a full
  // dedicated round trip; discounted by travelSharingDivisor for bundleable
  // jobs the same as the real distance-based number is.
  fuelFlatFee: 25,

  // Fixed monthly overhead (truck loan + vehicle insurance + business
  // liability insurance + a maintenance reserve + misc), divided by an
  // assumed jobs-per-month volume, recovered as a flat add per job. Set
  // against a realistic 45 jobs/month (within the 40-60/month range this
  // business is expected to run at once it's established) rather than a
  // worst-case low volume — this is the number to revisit whenever
  // loan/insurance costs or your actual job volume change. See README's
  // "Pricing & overhead" section.
  overheadPerJob: 17,

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
