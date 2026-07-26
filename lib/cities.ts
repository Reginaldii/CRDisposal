export type City = {
  slug: string;
  name: string;
  county: string;
  blurb: string;
};

export const cities: City[] = [
  { slug: 'allentown', name: 'Allentown', county: 'Lehigh County', blurb: "Lehigh Valley's largest city — same-day junk removal across every neighborhood." },
  { slug: 'bethlehem', name: 'Bethlehem', county: 'Northampton / Lehigh County', blurb: 'Serving the Southside, Historic District, and every cleanout in between.' },
  { slug: 'easton', name: 'Easton', county: 'Northampton County', blurb: 'Fast, affordable junk removal for Easton homeowners and property managers.' },
  { slug: 'whitehall', name: 'Whitehall', county: 'Lehigh County', blurb: 'Same-day and next-day pickup throughout Whitehall Township.' },
  { slug: 'emmaus', name: 'Emmaus', county: 'Lehigh County', blurb: 'Residential junk removal and cleanouts across Emmaus and South Whitehall.' },
  { slug: 'macungie', name: 'Macungie', county: 'Lehigh County', blurb: 'Fast pickup for cleanouts and junk removal in Macungie.' },
  { slug: 'catasauqua', name: 'Catasauqua', county: 'Lehigh County', blurb: 'Dependable junk removal for Catasauqua homeowners and landlords.' },
  { slug: 'nazareth', name: 'Nazareth', county: 'Northampton County', blurb: 'Serving Nazareth cleanouts and junk removal on schedule.' },
  { slug: 'northampton', name: 'Northampton', county: 'Northampton County', blurb: 'Junk removal across Northampton Borough and surrounding townships.' },
  { slug: 'coopersburg', name: 'Coopersburg', county: 'Lehigh County', blurb: 'Local, fast junk removal for Coopersburg homes.' },
  { slug: 'trexlertown', name: 'Trexlertown', county: 'Lehigh County', blurb: 'Trusted junk removal and hauling in Trexlertown and South Whitehall.' },
  { slug: 'hellertown', name: 'Hellertown', county: 'Northampton County', blurb: 'Junk removal for Hellertown and Lower Saucon Township, any size job.' },
];
