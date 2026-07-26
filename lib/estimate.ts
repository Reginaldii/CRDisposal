export type ItemOption = { id: string; label: string };
export type ItemCategory = { id: string; label: string; items: ItemOption[] };

export const itemCategories: ItemCategory[] = [
  {
    id: 'furniture',
    label: 'Furniture',
    items: [
      { id: 'mattress', label: 'Mattress' },
      { id: 'box-spring', label: 'Box Spring' },
      { id: 'couch', label: 'Couch' },
      { id: 'recliner', label: 'Recliner' },
      { id: 'table', label: 'Table' },
      { id: 'desk', label: 'Desk' },
      { id: 'cabinets', label: 'Cabinets' },
    ],
  },
  {
    id: 'appliances',
    label: 'Appliances',
    items: [
      { id: 'refrigerator', label: 'Refrigerator' },
      { id: 'freezer', label: 'Freezer' },
      { id: 'washer', label: 'Washer' },
      { id: 'dryer', label: 'Dryer' },
      { id: 'dishwasher', label: 'Dishwasher' },
      { id: 'water-heater', label: 'Water Heater' },
    ],
  },
  {
    id: 'construction',
    label: 'Construction Debris',
    items: [
      { id: 'drywall', label: 'Drywall' },
      { id: 'wood', label: 'Wood' },
      { id: 'concrete', label: 'Concrete' },
      { id: 'roofing', label: 'Roofing' },
    ],
  },
  {
    id: 'yard',
    label: 'Yard Waste',
    items: [
      { id: 'branches', label: 'Tree Branches' },
      { id: 'leaves', label: 'Leaves' },
      { id: 'brush', label: 'Brush' },
      { id: 'dirt', label: 'Dirt' },
    ],
  },
  {
    id: 'electronics',
    label: 'Electronics',
    items: [
      { id: 'tv', label: 'TV' },
      { id: 'computer', label: 'Computer' },
      { id: 'printer', label: 'Printer' },
    ],
  },
  {
    id: 'specialty',
    label: 'Specialty Items',
    items: [
      { id: 'exercise', label: 'Exercise Equipment' },
      { id: 'piano', label: 'Piano' },
      { id: 'pool-table', label: 'Pool Table' },
      { id: 'hot-tub', label: 'Hot Tub' },
      { id: 'shed', label: 'Shed' },
    ],
  },
  {
    id: 'general',
    label: 'General',
    items: [
      { id: 'trash-bags', label: 'Trash Bags' },
      { id: 'boxes', label: 'Boxes' },
      { id: 'garage-cleanout', label: 'Garage Cleanout' },
      { id: 'estate-cleanout', label: 'Estate Cleanout' },
      { id: 'office-furniture', label: 'Office Furniture' },
      { id: 'storage-unit', label: 'Storage Unit' },
      { id: 'other', label: 'Other' },
    ],
  },
];

export const propertyTypes = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'storage', label: 'Storage Unit' },
  { id: 'construction-site', label: 'Construction Site' },
];

export const specialConditions = [
  { id: 'inside', label: 'Inside House' },
  { id: 'outside', label: 'Outside Only' },
  { id: 'garage', label: 'Garage' },
  { id: 'basement', label: 'Basement' },
  { id: 'attic', label: 'Attic' },
  { id: 'second-floor', label: 'Second Floor' },
  { id: 'third-floor', label: 'Third Floor' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'long-carry', label: 'Long Carry' },
  { id: 'steep-driveway', label: 'Steep Driveway' },
  { id: 'gated', label: 'Gated Community' },
  { id: 'demolition', label: 'Demolition Required' },
  { id: 'heavy', label: 'Heavy Items' },
];

export type TruckFillLevel = { id: string; label: string; fill: number; desc: string };

// Fill levels are relative to the bed of our 2011 Ford F350 4x4 Mason dump
// truck — this is the one piece of physical equipment the whole estimate
// flow is calibrated against.
export const truckFillLevels: TruckFillLevel[] = [
  { id: 'single-item', label: 'Single Item', fill: 0.05, desc: 'One piece of furniture or appliance' },
  { id: 'pickup-load', label: 'Pickup Load', fill: 0.2, desc: 'About a pickup truck bed' },
  { id: 'quarter', label: 'Quarter Truck', fill: 0.25, desc: 'A few large items or several boxes' },
  { id: 'half', label: 'Half Truck', fill: 0.5, desc: 'A small room or garage section' },
  { id: 'three-quarter', label: 'Three Quarter Truck', fill: 0.75, desc: 'A full room or small cleanout' },
  { id: 'full', label: 'Full Truck', fill: 1, desc: 'A garage, basement, or full cleanout' },
];

export const dateOptions = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'this-week', label: 'This Week' },
  { id: 'choose', label: 'Choose Date' },
];

export const contactPreferences = [
  { id: 'call', label: 'Call' },
  { id: 'text', label: 'Text' },
  { id: 'email', label: 'Email' },
];
