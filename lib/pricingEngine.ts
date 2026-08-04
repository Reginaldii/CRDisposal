import { findItem } from './items';
import { pricingConfig } from './pricingConfig';

export type EstimateInput = {
  itemQuantities: Record<string, number>;
  accessConditions: string[];
  // Real-mileage fuel cost from lib/routeDistance.ts (server-only — see
  // that file). Omitted on the client-side live preview and whenever the
  // route lookup isn't configured or fails, in which case this falls back
  // to the flat pricingConfig.fuelFlatFee exactly as before.
  fuelCostOverride?: number;
};

export type EstimateResult = {
  volumeCuYd: number;
  weightLbs: number;
  effectiveCuYd: number;
  truckFillFraction: number;
  // Internal-only label (e.g. "About 1/2 Truck") — for the owner's
  // notification email, never shown to the customer.
  truckFillLabel: string;
  hasHeavyItems: boolean;
  laborHours: number;
  laborCost: number;
  disposalFee: number;
  fuelFee: number;
  overheadFee: number;
  conditionMultiplier: number;
  conditionFlatAdd: number;
  basePrice: number;
  priceLow: number;
  priceMid: number;
  priceHigh: number;
  estimatedProfit: number;
};

function round10(n: number) {
  return Math.round(n / 10) * 10;
}
function round1(n: number) {
  return Math.round(n * 10) / 10;
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function labelForFill(fraction: number): string {
  if (fraction <= 0) return 'No items';
  if (fraction <= 0.15) return 'Single Item / Small Load';
  if (fraction <= 0.3) return 'About 1/4 Truck';
  if (fraction <= 0.6) return 'About 1/2 Truck';
  if (fraction <= 0.85) return 'About 3/4 Truck';
  if (fraction <= 1.1) return 'Full Truck';
  return 'More Than One Truckload';
}

export function estimateJob({
  itemQuantities,
  accessConditions,
  fuelCostOverride,
}: EstimateInput): EstimateResult {
  let volumeCuYd = 0;
  let weightLbs = 0;
  let hasHeavyItems = false;

  for (const [itemId, quantity] of Object.entries(itemQuantities)) {
    if (!quantity || quantity <= 0) continue;
    const item = findItem(itemId);
    if (!item) continue;
    volumeCuYd += item.cuYd * quantity;
    weightLbs += item.lbs * quantity;
    if (item.heavy) hasHeavyItems = true;
  }

  const weightAsCuYd = weightLbs / pricingConfig.weightDensityLbsPerCuYd;
  const effectiveCuYd = Math.max(volumeCuYd, weightAsCuYd);

  const truckFillFraction = effectiveCuYd / pricingConfig.truckCapacityCubicYards;
  const truckFillLabel = labelForFill(truckFillFraction);

  const laborHours =
    pricingConfig.baseLaborHours + effectiveCuYd * pricingConfig.laborHoursPerEffectiveCubicYard;
  const laborCost = laborHours * pricingConfig.laborRatePerHour;

  // Billed by real weight, matching Berky's actual step-function fee
  // schedule — NOT a smooth per-cubic-yard rate. A single light item
  // costs the same minimum as anything else under disposalFeeMinimumLbs.
  const extraLbs = Math.max(0, weightLbs - pricingConfig.disposalFeeMinimumLbs);
  const extraTons = Math.ceil(extraLbs / pricingConfig.disposalFeeTonLbs);
  const disposalFee = pricingConfig.disposalFeeMinimum + extraTons * pricingConfig.disposalFeePerAdditionalTon;

  const fuelFee = fuelCostOverride ?? pricingConfig.fuelFlatFee;
  const overheadFee = pricingConfig.overheadPerJob;

  let conditionMultiplier = 0;
  let conditionFlatAdd = 0;
  const adjustments = pricingConfig.accessConditionAdjustments as Record<string, number>;
  for (const condition of accessConditions) {
    const adjustment = adjustments[condition];
    if (adjustment === undefined) continue;
    if (condition === 'disassemblyRequired') {
      conditionFlatAdd += adjustment;
    } else {
      conditionMultiplier += adjustment;
    }
  }
  // Auto-apply the heavy-items surcharge when the catalog flags an item as
  // heavy, even if the customer didn't separately check "Heavy Items" —
  // but don't double-charge if they did.
  if (hasHeavyItems && !accessConditions.includes('heavyItems')) {
    conditionMultiplier += adjustments.heavyItems ?? 0;
  }

  const coreCost = laborCost + disposalFee + fuelFee + overheadFee;
  const basePrice = Math.max(pricingConfig.minimumCharge, coreCost) * (1 + conditionMultiplier) + conditionFlatAdd;

  const priceLow = Math.max(pricingConfig.minimumCharge, round10(basePrice * pricingConfig.rangeSpread.low));
  const priceHigh = Math.max(priceLow + 10, round10(basePrice * pricingConfig.rangeSpread.high));
  const priceMid = round10((priceLow + priceHigh) / 2);

  const estimatedProfit = priceMid - coreCost;

  return {
    volumeCuYd: round1(volumeCuYd),
    weightLbs: Math.round(weightLbs),
    effectiveCuYd: round1(effectiveCuYd),
    truckFillFraction: round2(truckFillFraction),
    truckFillLabel,
    hasHeavyItems,
    laborHours: round1(laborHours),
    laborCost: Math.round(laborCost),
    disposalFee: Math.round(disposalFee),
    fuelFee: Math.round(fuelFee),
    overheadFee: Math.round(overheadFee),
    conditionMultiplier: round2(conditionMultiplier),
    conditionFlatAdd,
    basePrice: Math.round(basePrice),
    priceLow,
    priceMid,
    priceHigh,
    estimatedProfit: Math.round(estimatedProfit),
  };
}
