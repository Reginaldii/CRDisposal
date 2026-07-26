export const propertyTypes = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'storage', label: 'Storage Unit' },
  { id: 'construction-site', label: 'Construction Site' },
];

export const itemLocations = [
  { id: 'basement', label: 'Basement' },
  { id: 'first-floor', label: 'First Floor' },
  { id: 'second-floor', label: 'Second Floor' },
  { id: 'garage', label: 'Garage' },
  { id: 'attic', label: 'Attic' },
  { id: 'shed', label: 'Shed' },
  { id: 'storage-unit', label: 'Storage Unit' },
  { id: 'outside', label: 'Outside' },
  { id: 'curbside', label: 'Curbside' },
  { id: 'entire-house', label: 'Entire House' },
];

// Ids match pricingConfig.accessConditionAdjustments keys directly, so the
// pricing engine can look up each one's surcharge without a translation
// table.
export const accessConditions = [
  { id: 'stairs', label: 'Stairs' },
  { id: 'longCarry', label: 'Long Carry' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'heavyItems', label: 'Heavy Items' },
  { id: 'narrowHallway', label: 'Narrow Hallway' },
  { id: 'disassemblyRequired', label: 'Disassembly Required' },
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
