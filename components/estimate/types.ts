export type Photo = { id: string; dataUrl: string; name: string };

export type EstimateFormData = {
  name: string;
  phone: string;
  email: string;
  contactPreference: string;
  address: string;
  zip: string;
  city: string;
  propertyType: string;
  photos: Photo[];
  // itemId -> quantity. An item is "selected" when its quantity is > 0.
  itemQuantities: Record<string, number>;
  otherDescription: string;
  locations: string[];
  conditions: string[];
  dateOption: string;
  chosenDate: string;
  notes: string;
  referralCode: string;
};

export const initialEstimateData: EstimateFormData = {
  name: '',
  phone: '',
  email: '',
  contactPreference: 'call',
  address: '',
  zip: '',
  city: '',
  propertyType: 'residential',
  photos: [],
  itemQuantities: {},
  otherDescription: '',
  locations: [],
  conditions: [],
  dateOption: '',
  chosenDate: '',
  notes: '',
  referralCode: '',
};

export const MIN_PHOTOS = 3;
export const TOTAL_STEPS = 5;
