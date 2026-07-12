export type DumpsterSize = {
  id: string;
  size: string;
  cubicYards: number;
  dims: string;
  bestFor: string;
  capacityTons: number;
  basePrice: number;
  image: string;
};

export const dumpsterSizes: DumpsterSize[] = [
  {
    id: '10-yard',
    size: '10 Yard',
    cubicYards: 10,
    dims: "12' x 8' x 3.5'",
    bestFor: 'Small cleanouts, single-room remodels, yard debris',
    capacityTons: 2,
    basePrice: 395,
    image: '/images/dumpster-10.svg',
  },
  {
    id: '15-yard',
    size: '15 Yard',
    cubicYards: 15,
    dims: "14' x 8' x 4'",
    bestFor: 'Roofing jobs, garage cleanouts, mid-size remodels',
    capacityTons: 2.5,
    basePrice: 445,
    image: '/images/dumpster-15.svg',
  },
  {
    id: '20-yard',
    size: '20 Yard',
    cubicYards: 20,
    dims: "16' x 8' x 4.5'",
    bestFor: 'Kitchen & bath remodels, flooring, whole-home cleanouts',
    capacityTons: 3,
    basePrice: 495,
    image: '/images/dumpster-20.svg',
  },
  {
    id: '30-yard',
    size: '30 Yard',
    cubicYards: 30,
    dims: "20' x 8' x 5.5'",
    bestFor: 'New construction, additions, large demolition',
    capacityTons: 4,
    basePrice: 575,
    image: '/images/dumpster-30.svg',
  },
];

export type ProjectType = {
  id: string;
  label: string;
  recommendedSizeId: string;
  note: string;
};

export const projectTypes: ProjectType[] = [
  { id: 'roofing', label: 'Roofing', recommendedSizeId: '15-yard', note: 'Covers up to 30 sq. of shingle tear-off.' },
  { id: 'kitchen', label: 'Kitchen Remodel', recommendedSizeId: '20-yard', note: 'Cabinets, countertops & flooring.' },
  { id: 'bathroom', label: 'Bathroom Remodel', recommendedSizeId: '10-yard', note: 'Tile, vanity & fixture removal.' },
  { id: 'garage', label: 'Garage Cleanout', recommendedSizeId: '15-yard', note: 'Bulk items and general storage clear-out.' },
  { id: 'concrete', label: 'Concrete / Heavy Debris', recommendedSizeId: '10-yard', note: 'Weight-rated dumpster — ask about heavy debris pricing.' },
  { id: 'drywall', label: 'Drywall', recommendedSizeId: '15-yard', note: 'New construction or remodel drywall waste.' },
  { id: 'brush', label: 'Brush / Yard Waste', recommendedSizeId: '20-yard', note: 'Land clearing, landscaping & storm cleanup.' },
  { id: 'house', label: 'House Cleanout', recommendedSizeId: '30-yard', note: 'Full property or estate cleanout.' },
];

export const materials = [
  { id: 'general', label: 'General Construction / Mixed Debris' },
  { id: 'roofing', label: 'Roofing Shingles' },
  { id: 'concrete', label: 'Concrete / Brick / Asphalt' },
  { id: 'yard', label: 'Yard Waste / Brush' },
  { id: 'household', label: 'Household Junk' },
];
