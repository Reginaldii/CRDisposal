import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { cities } from '@/lib/cities';
import { ArrowRightIcon, MapPinIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Service Areas — Dumpster Rental Across the Lehigh Valley',
  description:
    'CR Disposal delivers dumpsters across the Lehigh Valley, PA including Allentown, Bethlehem, Easton, Whitehall, Emmaus, and more.',
  alternates: { canonical: '/service-areas' },
};

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Delivering across the entire Lehigh Valley."
        subtitle="Same-day and next-day dumpster delivery in Lehigh and Northampton counties. Don't see your town? Call us — we probably still cover it."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="group rounded-2xl border border-ink-900/10 p-7 transition-all hover:border-yellow-500 hover:shadow-soft dark:border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
                    <MapPinIcon className="h-5 w-5 text-yellow-500" />
                    {c.name}, PA
                  </span>
                  <ArrowRightIcon className="h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-yellow-500" />
                </div>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-ink-400">{c.county}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Don't see your town listed?" subtitle="We're always expanding coverage — call us and we'll confirm delivery to your address." />
    </>
  );
}
