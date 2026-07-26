// Tapping a preset expands the matching catalog categories, so customers
// who know their job type don't have to hunt through every category.
export type JobPreset = {
  id: string;
  label: string;
  categories: string[];
};

export const jobPresets: JobPreset[] = [
  { id: 'single-item', label: 'Single Item', categories: [] },
  { id: 'garage-cleanout', label: 'Garage Cleanout', categories: ['garage', 'general'] },
  { id: 'basement', label: 'Basement', categories: ['furniture', 'boxes', 'general'] },
  { id: 'storage-unit', label: 'Storage Unit', categories: ['boxes', 'furniture', 'general'] },
  { id: 'apartment', label: 'Apartment', categories: ['furniture', 'appliances', 'electronics', 'boxes'] },
  {
    id: 'house-cleanout',
    label: 'House Cleanout',
    categories: ['furniture', 'appliances', 'electronics', 'boxes', 'general'],
  },
  { id: 'construction-debris', label: 'Construction Debris', categories: ['construction'] },
  { id: 'yard-cleanup', label: 'Yard Cleanup', categories: ['yard'] },
];
