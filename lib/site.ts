// GitHub Pages serves this project from a /CRDisposal sub-path, so every
// static asset reference needs that prefix when built for that target.
// Keep this in sync with `repoName` in next.config.mjs.
export const assetPrefix = process.env.GITHUB_PAGES === 'true' ? '/CRDisposal' : '';

export const site = {
  name: 'CR Disposal',
  tagline: 'Dumpster Rentals Done Right.',
  phone: '(610) 555-0199',
  phoneHref: 'tel:+16105550199',
  email: 'hello@crdisposal.com',
  address: {
    street: '4200 Industrial Park Rd',
    city: 'Allentown',
    state: 'PA',
    zip: '18109',
  },
  hours: [
    { days: 'Monday – Friday', time: '6:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '7:00 AM – 3:00 PM' },
    { days: 'Sunday', time: 'Closed (Emergency service available)' },
  ],
  social: {
    google: 'https://www.google.com/maps',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  url:
    process.env.GITHUB_PAGES === 'true'
      ? 'https://reginaldii.github.io/CRDisposal'
      : 'https://www.crdisposal.com',
};

export const primaryNav = [
  { label: 'Dumpster Rentals', href: '/dumpster-rentals' },
  { label: 'Construction Debris', href: '/construction-debris' },
  { label: 'Contractors', href: '/contractors' },
  { label: 'Residential', href: '/residential' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
