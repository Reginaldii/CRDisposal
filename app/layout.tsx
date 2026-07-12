import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { site } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'CR Disposal | Dumpster Rentals Done Right — Lehigh Valley, PA',
    template: '%s | CR Disposal',
  },
  description:
    'Fast, transparent dumpster rentals for contractors, roofers, remodelers, and homeowners across the Lehigh Valley. Same-day delivery, hooklift service, licensed & insured.',
  keywords: [
    'dumpster rental Lehigh Valley',
    'dumpster rental Allentown',
    'construction debris hauling',
    'roll off dumpster PA',
    'junk removal Lehigh Valley',
    'hooklift dumpster service',
  ],
  authors: [{ name: 'CR Disposal' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: 'CR Disposal',
    title: 'CR Disposal | Dumpster Rentals Done Right',
    description:
      'Fast, transparent dumpster rentals for contractors and homeowners across the Lehigh Valley, PA.',
    images: [{ url: `${site.url}/images/logo.png`, width: 1200, height: 1200, alt: 'CR Disposal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CR Disposal | Dumpster Rentals Done Right',
    description: 'Fast, transparent dumpster rentals across the Lehigh Valley, PA.',
    images: [`${site.url}/images/logo.png`],
  },
  icons: {
    icon: `${site.url}/images/logo.png`,
    apple: `${site.url}/images/logo.png`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  name: site.name,
  image: `${site.url}/images/logo.png`,
  telephone: site.phone,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'Place',
    name: 'Lehigh Valley, Pennsylvania',
  },
  url: site.url,
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '07:00', closes: '15:00' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans">
        <Header />
        <main className="pb-[68px] xl:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
