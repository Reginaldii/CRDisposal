// Customer-facing published pricing — a simple, predictable price list
// instead of the full cost-model math customers never see. This is what
// actually gets shown; lib/pricingEngine.ts's cost model still runs
// underneath for every submission and drives the *internal* email/sheet,
// so you always know the real cost even though the customer only ever
// sees one of these two tables.
//
// Two layers:
//   1. Headline items — a short list of the most commonly requested single
//      items, each with its own flat published price. Only applies when
//      the customer selects exactly one unit of exactly one of these
//      items and nothing else.
//   2. Volume tiers — everything else (multiple items, quantities > 1, or
//      an item not on the headline list) falls back to a price based on
//      how much of the truck the job fills.
//
// Reviewed 2026-08 against RJC Junk Solutions, Premier Junk Removal,
// College HUNKS, and 1-800-GOT-JUNK's published/researched pricing for
// the Lehigh Valley, cross-checked against lib/pricingEngine.ts's real
// cost floor for each item so nothing here is priced below what it
// actually costs to do the job — except where noted below.
//
// Deliberate choice: Chair, Box Spring, and Grill are priced BELOW their
// real standalone cost floor (~$160-175, see lib/pricingEngine.ts) on
// purpose. In practice these are almost never a standalone trip — they
// ride along with something bigger — so they're priced as "add it on"
// items, not as jobs meant to be booked alone. If you start getting a lot
// of true one-off calls for just a chair/box spring/grill, that
// assumption is wrong and these three should come up to match the rest
// of the table (use the same real-cost-plus-margin approach the other
// seven items already follow).
export type HeadlineItem = {
  key: string;
  label: string;
  // Catalog item ids (lib/items.ts) that this published price applies to.
  itemIds: string[];
  low: number;
  high: number;
};

export const headlineItems: HeadlineItem[] = [
  { key: 'chair', label: 'Chair', itemIds: ['chair'], low: 69, high: 89 },
  { key: 'box-spring', label: 'Box Spring', itemIds: ['box-spring'], low: 49, high: 69 },
  { key: 'grill', label: 'Grill', itemIds: ['grill'], low: 69, high: 99 },
  { key: 'recliner', label: 'Recliner', itemIds: ['recliner'], low: 189, high: 249 },
  { key: 'mattress', label: 'Mattress', itemIds: ['mattress'], low: 179, high: 239 },
  { key: 'dresser', label: 'Dresser', itemIds: ['dresser', 'cabinet'], low: 199, high: 259 },
  { key: 'couch', label: 'Couch / Loveseat', itemIds: ['sofa', 'loveseat', 'sectional'], low: 189, high: 249 },
  { key: 'washer-dryer', label: 'Washer / Dryer', itemIds: ['washer', 'dryer'], low: 209, high: 269 },
  { key: 'refrigerator', label: 'Refrigerator', itemIds: ['refrigerator', 'freezer'], low: 229, high: 289 },
  {
    key: 'exercise',
    label: 'Exercise Equipment',
    itemIds: ['treadmill', 'elliptical', 'weight-bench', 'exercise-bike'],
    low: 209,
    high: 269,
  },
];

export type VolumeTier = {
  label: string;
  // Upper bound of truck-fill fraction this tier covers (ascending scan —
  // same pattern as labelForFill in lib/pricingEngine.ts).
  maxFraction: number;
  low: number;
  high: number;
};

export const volumeTiers: VolumeTier[] = [
  { label: '1/8 Truck', maxFraction: 0.125, low: 125, high: 175 },
  { label: '1/4 Truck', maxFraction: 0.25, low: 225, high: 300 },
  { label: '3/8 Truck', maxFraction: 0.375, low: 325, high: 400 },
  { label: '1/2 Truck', maxFraction: 0.5, low: 425, high: 500 },
  { label: '3/4 Truck', maxFraction: 0.75, low: 575, high: 675 },
  { label: 'Full Truck', maxFraction: Infinity, low: 700, high: 850 },
];

export type PublishedPrice = {
  low: number;
  high: number;
  source: 'item' | 'volume';
  label: string;
};

/**
 * The price shown to the customer. Exactly one unit of exactly one
 * headline item uses that item's flat price; anything else (multiple
 * items, quantity > 1, or an item not on the headline list) uses the
 * volume tier matching how full the truck is.
 */
export function getPublishedPrice(
  itemQuantities: Record<string, number>,
  truckFillFraction: number
): PublishedPrice {
  const selected = Object.entries(itemQuantities).filter(([, qty]) => qty > 0);
  if (selected.length === 1 && selected[0][1] === 1) {
    const [itemId] = selected[0];
    const headline = headlineItems.find((h) => h.itemIds.includes(itemId));
    if (headline) {
      return { low: headline.low, high: headline.high, source: 'item', label: headline.label };
    }
  }

  const tier = volumeTiers.find((t) => truckFillFraction <= t.maxFraction) ?? volumeTiers[volumeTiers.length - 1];
  return { low: tier.low, high: tier.high, source: 'volume', label: tier.label };
}
