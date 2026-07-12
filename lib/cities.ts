export type City = {
  slug: string;
  name: string;
  county: string;
  blurb: string;
};

export const cities: City[] = [
  { slug: 'allentown', name: 'Allentown', county: 'Lehigh County', blurb: "Lehigh Valley's largest city — fast delivery for contractors and homeowners across every neighborhood." },
  { slug: 'bethlehem', name: 'Bethlehem', county: 'Northampton / Lehigh County', blurb: 'Serving the Southside, Historic District, and every remodel or new-build site in between.' },
  { slug: 'easton', name: 'Easton', county: 'Northampton County', blurb: 'Reliable dumpster delivery for Easton contractors, property managers, and homeowners.' },
  { slug: 'whitehall', name: 'Whitehall', county: 'Lehigh County', blurb: 'Same-day and next-day roll-off service throughout Whitehall Township.' },
  { slug: 'emmaus', name: 'Emmaus', county: 'Lehigh County', blurb: 'Residential and contractor dumpster rentals across Emmaus and South Whitehall.' },
  { slug: 'macungie', name: 'Macungie', county: 'Lehigh County', blurb: 'Fast hooklift delivery for new construction and remodel sites in Macungie.' },
  { slug: 'catasauqua', name: 'Catasauqua', county: 'Lehigh County', blurb: 'Dependable dumpster rental for Catasauqua homeowners and local contractors.' },
  { slug: 'nazareth', name: 'Nazareth', county: 'Northampton County', blurb: 'Serving Nazareth remodels, cleanouts, and construction projects on schedule.' },
  { slug: 'northampton', name: 'Northampton', county: 'Northampton County', blurb: 'Roll-off dumpster delivery across Northampton Borough and surrounding townships.' },
  { slug: 'coopersburg', name: 'Coopersburg', county: 'Lehigh County', blurb: 'Local, fast dumpster service for Coopersburg homes and job sites.' },
  { slug: 'trexlertown', name: 'Trexlertown', county: 'Lehigh County', blurb: 'Contractor-trusted hauling and dumpster delivery in Trexlertown and South Whitehall.' },
  { slug: 'hellertown', name: 'Hellertown', county: 'Northampton County', blurb: 'Dumpster rentals for Hellertown and Lower Saucon Township projects of any size.' },
];
