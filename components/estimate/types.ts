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
  items: string[];
  otherDescription: string;
  conditions: string[];
  truckFill: string;
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
  items: [],
  otherDescription: '',
  conditions: [],
  truckFill: '',
  dateOption: '',
  chosenDate: '',
  notes: '',
  referralCode: '',
};

export const TOTAL_STEPS = 5;
