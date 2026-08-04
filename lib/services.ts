export type Service = {
  id: string;
  label: string;
  icon: string;
};

export const services: Service[] = [
  { id: 'furniture', label: 'Furniture Removal', icon: 'sofa' },
  { id: 'appliances', label: 'Appliance Removal', icon: 'appliance' },
  { id: 'garage', label: 'Garage Cleanouts', icon: 'garage' },
  { id: 'estate', label: 'Estate Cleanouts', icon: 'home' },
  { id: 'construction', label: 'Construction Debris', icon: 'building' },
  { id: 'yard', label: 'Yard Waste', icon: 'leaf' },
  { id: 'hottub', label: 'Hot Tub Removal', icon: 'hottub' },
  { id: 'shed', label: 'Shed Removal', icon: 'shed' },
  { id: 'office', label: 'Office Cleanouts', icon: 'briefcase' },
  { id: 'commercial', label: 'Commercial Junk Removal', icon: 'building2' },
  { id: 'storage', label: 'Storage Unit Cleanouts', icon: 'box' },
  { id: 'rental', label: 'Rental Property Cleanouts', icon: 'key' },
];

export const whyChooseUs = [
  { label: 'Same Day Service', icon: 'clock' },
  { label: 'Upfront Pricing', icon: 'tag' },
  { label: 'We Do All The Heavy Lifting', icon: 'muscle' },
  { label: 'Eco Friendly Disposal', icon: 'leaf' },
  { label: 'Careful With Your Home', icon: 'shield' },
  { label: 'Locally Owned', icon: 'home' },
];

export const howItWorks = [
  { step: '1', title: 'Book', desc: 'Call, text, or submit a free estimate in under two minutes.' },
  { step: '2', title: 'We Arrive', desc: 'Same-day and next-day windows, right on time.' },
  { step: '3', title: 'Your Junk Is Gone', desc: 'We do the lifting, loading, and disposal — you do nothing.' },
];
