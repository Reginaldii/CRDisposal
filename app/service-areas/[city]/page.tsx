import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import FeatureGrid from '@/components/FeatureGrid';
import { cities } from '@/lib/cities';
import { dumpsterSizes } from '@/lib/dumpsters';
import { CheckIcon } from '@/components/icons';

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return {};
  return {
    title: `Dumpster Rental in ${city.name}, PA`,
    description: `Same-day dumpster rental delivery in ${city.name}, PA. Transparent flat-rate pricing for contractors and homeowners. ${city.blurb}`,
    alternates: { canonical: `/service-areas/${city.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: `CR Disposal — ${city.name}, PA`,
    areaServed: { '@type': 'City', name: `${city.name}, Pennsylvania` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <PageHero
        eyebrow={`${city.county}`}
        title={`Dumpster Rental in ${city.name}, PA`}
        subtitle={city.blurb}
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dumpsterSizes.map((s) => (
            <div key={s.id} className="rounded-2xl border border-ink-900/10 p-6 dark:border-white/10">
              <p className="font-display text-2xl font-extrabold tracking-tight">{s.size}</p>
              <p className="mt-1 text-xs text-ink-400">{s.dims}</p>
              <p className="mt-4 text-sm text-ink-600 dark:text-ink-200">Starting at ${s.basePrice} in {city.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-ink-50 dark:bg-ink-800">
        <div className="container-x max-w-2xl">
          <p className="eyebrow">Local Service</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why {city.name} chooses CR Disposal
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              `Fast delivery to every neighborhood in ${city.name}`,
              `Local knowledge of ${city.name} permit requirements`,
              'Flat-rate pricing with no hidden fees',
              'Hooklift trucks that protect driveways and tight lots',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <span className="text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FeatureGrid />

      <CTASection
        title={`Book a dumpster in ${city.name} today.`}
        subtitle="Get an instant price online or call and talk to a local dispatcher."
      />
    </>
  );
}
