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
// College HUNKS, 1-800-GOT-JUNK, Just Junk It Removal, Berks Junk
// Removal, and Lehigh Valley Top Junk's published/researched pricing for
// the Lehigh Valley, plus Google's own AI-overview data for mattress
// removal specifically ($65-130 average in the Breinigsville/Allentown
// area). These are the owner's own proposed numbers, used as-is — a
// previous revision raised 7 of these 10 back up to match
// lib/pricingEngine.ts's real cost floor (~$160-290 depending on the
// item), which defeated the entire point of publishing a competitive
// price and undercut the exact Google data that started this. Every
// item below is priced to win the phone call, not to individually clear
// real cost — that's what the margin-risk flag in app/api/estimate/
// route.ts is for (it compares every submission's published price
// against the real cost model and flags jobs that need a human look
// before the final price is confirmed). Don't raise these again without
// being asked — if margin becomes a real problem, the fix is tightening
// smallLoadDisposalDivisor/overheadPerJob in lib/pricingConfig.ts (which
// lowers real cost) or reviewing which jobs actually need a bump after
// personal review, not quietly inflating what's advertised here.
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
  { key: 'recliner', label: 'Recliner', itemIds: ['recliner'], low: 79, high: 109 },
  { key: 'mattress', label: 'Mattress', itemIds: ['mattress'], low: 89, high: 119 },
  { key: 'dresser', label: 'Dresser', itemIds: ['dresser', 'cabinet'], low: 79, high: 119 },
  { key: 'couch', label: 'Couch / Loveseat', itemIds: ['sofa', 'loveseat', 'sectional'], low: 99, high: 149 },
  { key: 'washer-dryer', label: 'Washer / Dryer', itemIds: ['washer', 'dryer'], low: 99, high: 149 },
  { key: 'refrigerator', label: 'Refrigerator', itemIds: ['refrigerator', 'freezer'], low: 109, high: 169 },
  {
    key: 'exercise',
    label: 'Exercise Equipment',
    itemIds: ['treadmill', 'elliptical', 'weight-bench', 'exercise-bike'],
    low: 99,
    high: 199,
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
