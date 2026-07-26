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
  // True when the customer skips the item list entirely and relies on
  // photos (+ optional note) instead — see Step1Items.
  skipItemList: boolean;
  unknownItemsNote: string;
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
  skipItemList: false,
  unknownItemsNote: '',
  locations: [],
  conditions: [],
  dateOption: '',
  chosenDate: '',
  notes: '',
  referralCode: '',
};

export const MIN_PHOTOS = 1;
export const TOTAL_STEPS = 5;
