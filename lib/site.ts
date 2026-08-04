export const site = {
  name: 'CR Disposal',
  tagline: 'Junk Gone Today.',
  phone: '(484) 272-7021',
  phoneHref: 'tel:+14842727021',
  smsHref: 'sms:+14842727021',
  email: 'crdisposalservice@gmail.com',
  // No rating/review count yet — no Google Business Profile connected and
  // zero real reviews. Do not hardcode a number here; wire this up for
  // real once there's an actual Google Business Profile to pull from.
  // No public street address yet — keep this null rather than showing a
  // fake one, and every consumer below should render around it being unset.
  address: null as { street: string; city: string; state: string; zip: string } | null,
  serviceArea: 'Lehigh Valley, PA',
  hours: [{ days: 'Every day', time: '24/7 — on call' }],
  url: 'https://www.crdisposal.com',
};

// Prefixed with "/" so these still work correctly from pages other than
// the homepage (e.g. /partners) — the browser navigates home, then jumps
// to the anchor. On the homepage itself this is still just a hash jump.
export const primaryNav = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Estimate', href: '/#estimate' },
  { label: 'About', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Partners', href: '/partners' },
];
