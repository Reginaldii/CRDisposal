export const partnerSteps = [
  { step: '1', title: 'Refer', desc: 'Recommend CR Disposal to your clients.' },
  { step: '2', title: 'We Complete the Job', desc: 'We provide professional service and keep your client happy.' },
  { step: '3', title: 'You Get Paid', desc: 'Receive a referral commission after the job is completed and paid.' },
];

export const whyPartner = [
  { label: 'Professional Service', icon: 'shield' },
  { label: 'Fast Response Times', icon: 'clock' },
  { label: 'Licensed & Insured', icon: 'shield' },
  { label: 'Reliable Communication', icon: 'message' },
  { label: 'Transparent Pricing', icon: 'tag' },
  { label: 'Happy Clients', icon: 'star' },
  { label: 'Easy Referral Process', icon: 'check' },
];

export type IdealPartner = { label: string; icon: string };

export const idealPartners: IdealPartner[] = [
  { label: 'Realtors', icon: 'key' },
  { label: 'Property Managers', icon: 'building2' },
  { label: 'Contractors', icon: 'building' },
  { label: 'Plumbers', icon: 'wrench' },
  { label: 'Electricians', icon: 'bolt' },
  { label: 'Landscapers', icon: 'leaf' },
  { label: 'Estate Sales', icon: 'home' },
  { label: 'Cleanout Companies', icon: 'box' },
  { label: 'Storage Facilities', icon: 'garage' },
  { label: 'Senior Moving Services', icon: 'heart' },
  { label: 'Home Builders', icon: 'hammer' },
  { label: 'Investors', icon: 'chart' },
];

export const partnerFaqs = [
  {
    q: 'How do I refer someone?',
    a: 'Simply send us the customer’s name and contact information, or have them mention your business when scheduling.',
  },
  {
    q: 'When do I get paid?',
    a: 'After the customer pays for the completed job.',
  },
  {
    q: 'Is there a limit?',
    a: 'No — there’s no limit to the number of referrals you can send.',
  },
  {
    q: 'Does it cost anything to join?',
    a: 'No, joining the Partner Program is completely free.',
  },
  {
    q: 'Who can join?',
    a: 'Any local business or professional who regularly encounters junk removal needs.',
  },
];

export const businessTypes = [
  'Realtor',
  'Property Manager',
  'Contractor',
  'Electrician',
  'Plumber',
  'Roofer',
  'Landscaper',
  'Estate Sale Company',
  'Cleaning Company',
  'Storage Facility',
  'Senior Move Manager',
  'Investor / House Flipper',
  'Other',
];

export const referralSources = [
  'Google Search',
  'Google Reviews',
  'Referred by another partner',
  'Referred by a customer',
  'Social Media',
  'Saw a CR Disposal truck',
  'Other',
];
