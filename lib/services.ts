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
  { label: 'Scheduling That Fits The Job', icon: 'clock' },
  { label: 'Estimate Before Work Begins', icon: 'tag' },
  { label: 'We Do All The Heavy Lifting', icon: 'muscle' },
  { label: 'Responsible Disposal', icon: 'leaf' },
  { label: 'Careful With Your Home', icon: 'shield' },
  { label: 'Locally Owned', icon: 'home' },
];

export const howItWorks = [
  { step: '1', title: 'Show Us The Job', desc: 'Call, text photos, or send the short estimate form below.' },
  { step: '2', title: 'Review The Estimate', desc: 'We review the amount, access, location, and timing before confirming the job.' },
  { step: '3', title: 'We Clear The Space', desc: 'We handle the lifting, loading, hauling, and disposal.' },
];
