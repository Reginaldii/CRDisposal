// Every dollar figure and assumption the estimate engine uses lives here.
// Update prices, fees, and truck assumptions here — never in the pricing
// logic itself (lib/pricingEngine.ts).
//
// "Effective cubic yards" = whichever is larger of the load's actual
// volume, or its weight converted to an equivalent volume using
// weightDensityLbsPerCuYd. This keeps heavy-but-small loads (concrete,
// dirt) priced fairly even though they wouldn't fill much physical space.
export const pricingConfig = {
  // Minimum charge for any job, regardless of how small.
  minimumCharge: 125,

  // Core rate: $ per effective cubic yard of debris.
  pricePerEffectiveCubicYard: 45,

  // The displayed range is the calculated price times these two
  // multipliers (e.g. a $300 calculated price shows as "$270 - $345").
  rangeSpread: { low: 0.9, high: 1.15 },

  // Our dump truck's approximate usable volume and safe payload weight.
  // Used only to compute the internal "how full is the truck" label for
  // your own notification email — never shown to the customer.
  truckCapacityCubicYards: 10,
  truckCapacityWeightLbs: 6000,

  // Assumed average density of mixed debris, used to convert weight into
  // "effective cubic yards" for heavy/dense loads.
  weightDensityLbsPerCuYd: 400,

  // Labor.
  laborRatePerHour: 60,
  baseLaborHours: 0.75, // minimum crew time for any job, however small
  laborHoursPerEffectiveCubicYard: 0.15,

  // Disposal / tipping fees, per effective cubic yard.
  disposalFeePerEffectiveCubicYard: 12,

  // Flat placeholder until real distance-based travel pricing is added
  // (needs a mapping API — intentionally deferred, see Estimate V2 notes).
  fuelFlatFee: 25,

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
