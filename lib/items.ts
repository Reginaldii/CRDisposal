export type ItemDef = {
  id: string;
  label: string;
  cuYd: number; // approximate volume per unit, cubic yards
  lbs: number; // approximate weight per unit, pounds
  heavy?: boolean; // flags extra labor/access sensitivity
};

export type ItemCategory = {
  id: string;
  label: string;
  items: ItemDef[];
};

export const itemCategories: ItemCategory[] = [
  {
    id: 'furniture',
    label: 'Furniture',
    items: [
      { id: 'sofa', label: 'Sofa', cuYd: 3, lbs: 100 },
      { id: 'loveseat', label: 'Loveseat', cuYd: 2, lbs: 70 },
      { id: 'recliner', label: 'Recliner', cuYd: 1.5, lbs: 80, heavy: true },
      { id: 'mattress', label: 'Mattress', cuYd: 2.5, lbs: 60 },
      { id: 'box-spring', label: 'Box Spring', cuYd: 2, lbs: 50 },
      { id: 'dresser', label: 'Dresser', cuYd: 2, lbs: 120, heavy: true },
      { id: 'coffee-table', label: 'Coffee Table', cuYd: 1, lbs: 40 },
      { id: 'dining-table', label: 'Dining Table', cuYd: 2, lbs: 90 },
      { id: 'chair', label: 'Chair', cuYd: 0.5, lbs: 25 },
      { id: 'desk', label: 'Desk', cuYd: 1.5, lbs: 80 },
      { id: 'cabinet', label: 'Cabinet', cuYd: 2, lbs: 100, heavy: true },
    ],
  },
  {
    id: 'appliances',
    label: 'Appliances',
    items: [
      { id: 'refrigerator', label: 'Refrigerator', cuYd: 4, lbs: 250, heavy: true },
      { id: 'freezer', label: 'Freezer', cuYd: 3, lbs: 150, heavy: true },
      { id: 'washer', label: 'Washer', cuYd: 2.5, lbs: 200, heavy: true },
      { id: 'dryer', label: 'Dryer', cuYd: 2.5, lbs: 150, heavy: true },
      { id: 'dishwasher', label: 'Dishwasher', cuYd: 1.5, lbs: 80 },
      { id: 'water-heater', label: 'Water Heater', cuYd: 2, lbs: 150, heavy: true },
      { id: 'stove', label: 'Stove / Range', cuYd: 2, lbs: 150, heavy: true },
      { id: 'microwave', label: 'Microwave', cuYd: 0.3, lbs: 30 },
      { id: 'ac-unit', label: 'AC Unit', cuYd: 0.5, lbs: 60 },
    ],
  },
  {
    id: 'electronics',
    label: 'Electronics',
    items: [
      { id: 'tv', label: 'TV', cuYd: 1, lbs: 40 },
      { id: 'computer', label: 'Computer', cuYd: 0.3, lbs: 20 },
      { id: 'printer', label: 'Printer', cuYd: 0.3, lbs: 20 },
      { id: 'monitor', label: 'Monitor', cuYd: 0.3, lbs: 15 },
    ],
  },
  {
    id: 'construction',
    label: 'Construction Debris',
    items: [
      { id: 'drywall', label: 'Drywall (bundle)', cuYd: 0.5, lbs: 50 },
      { id: 'wood', label: 'Wood / Lumber (bundle)', cuYd: 0.5, lbs: 40 },
      { id: 'concrete', label: 'Concrete (5-gal bucket)', cuYd: 0.2, lbs: 300, heavy: true },
      { id: 'roofing', label: 'Roofing (bundle)', cuYd: 0.3, lbs: 80, heavy: true },
    ],
  },
  {
    id: 'yard',
    label: 'Yard Waste',
    items: [
      { id: 'yard-bag', label: 'Bag (leaves/brush)', cuYd: 0.33, lbs: 20 },
      { id: 'branch-bundle', label: 'Branch Bundle', cuYd: 0.5, lbs: 30 },
      { id: 'small-tree', label: 'Small Tree / Stump', cuYd: 1, lbs: 100, heavy: true },
    ],
  },
  {
    id: 'boxes',
    label: 'Boxes',
    items: [
      { id: 'box-small', label: 'Small Box', cuYd: 0.15, lbs: 20 },
      { id: 'box-medium', label: 'Medium Box', cuYd: 0.25, lbs: 30 },
      { id: 'box-large', label: 'Large Box', cuYd: 0.4, lbs: 40 },
    ],
  },
  {
    id: 'garage',
    label: 'Garage Items',
    items: [
      { id: 'bike', label: 'Bike', cuYd: 0.5, lbs: 30 },
      { id: 'lawn-mower', label: 'Lawn Mower', cuYd: 1, lbs: 80, heavy: true },
      { id: 'tool-chest', label: 'Tool Chest', cuYd: 1, lbs: 100, heavy: true },
      { id: 'ladder', label: 'Ladder', cuYd: 0.5, lbs: 25 },
      { id: 'shelving', label: 'Shelving Unit', cuYd: 1, lbs: 50 },
    ],
  },
  {
    id: 'exercise',
    label: 'Exercise Equipment',
    items: [
      { id: 'treadmill', label: 'Treadmill', cuYd: 3, lbs: 200, heavy: true },
      { id: 'elliptical', label: 'Elliptical', cuYd: 2.5, lbs: 150, heavy: true },
      { id: 'weight-bench', label: 'Weight Bench', cuYd: 1, lbs: 80, heavy: true },
      { id: 'exercise-bike', label: 'Exercise Bike', cuYd: 1, lbs: 60 },
    ],
  },
  {
    id: 'general',
    label: 'Storage & General',
    items: [
      { id: 'storage-bin', label: 'Storage Bin / Tote', cuYd: 0.2, lbs: 15 },
      { id: 'hot-tub', label: 'Hot Tub', cuYd: 8, lbs: 400, heavy: true },
      { id: 'piano', label: 'Piano', cuYd: 3, lbs: 300, heavy: true },
      { id: 'pool-table', label: 'Pool Table', cuYd: 4, lbs: 250, heavy: true },
      { id: 'shed', label: 'Small Shed', cuYd: 10, lbs: 400, heavy: true },
      { id: 'other', label: 'Other', cuYd: 1, lbs: 50 },
    ],
  },
];

export const allItems: ItemDef[] = itemCategories.flatMap((c) => c.items);

export function findItem(id: string): ItemDef | undefined {
  return allItems.find((i) => i.id === id);
}
