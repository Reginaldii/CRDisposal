import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import DumpsterSizeCalculator from '@/components/DumpsterSizeCalculator';
import CTASection from '@/components/CTASection';
import { dumpsterSizes } from '@/lib/dumpsters';
import { CheckIcon, ArrowRightIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Dumpster Rentals in the Lehigh Valley, PA',
  description:
    'Roll-off and hooklift dumpster rentals from 10 to 30 yards. Same-day delivery, flat-rate pricing, no hidden fees. Serving the entire Lehigh Valley.',
  alternates: { canonical: '/dumpster-rentals' },
};

export default function DumpsterRentalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Dumpster Rentals"
        title="Roll-off dumpsters, delivered fast."
        subtitle="Four sizes, one flat rate, zero surprises. Whatever the project, we have a dumpster that fits — and a truck that shows up when we say it will."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dumpsterSizes.map((s) => (
              <div
                key={s.id}
                className="flex flex-col rounded-3xl border border-ink-900/10 bg-white p-7 shadow-soft transition-shadow hover:shadow-lift dark:border-white/10 dark:bg-ink-800"
              >
                <p className="font-display text-3xl font-extrabold tracking-tight">{s.size}</p>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{s.dims}</p>
                <p className="mt-5 text-sm leading-relaxed text-ink-600 dark:text-ink-200">{s.bestFor}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink-600 dark:text-ink-200">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-yellow-500" /> Up to {s.capacityTons} tons included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-yellow-500" /> 7-day standard rental
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <p className="text-2xl font-bold">
                    ${s.basePrice}
                    <span className="text-sm font-medium text-ink-400"> starting</span>
                  </p>
                  <Link href={`/quote?size=${s.id}`} className="btn-dark mt-4 w-full">
                    Rent the {s.size}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DumpsterSizeCalculator />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Hooklift Advantage</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Why hooklift beats traditional roll-off.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500 dark:text-ink-300">
              Our hooklift trucks place and pull containers with a low-angle lift that&apos;s
              gentler on driveways, faster on tight job sites, and safer around parked vehicles
              and landscaping than a dragged roll-off chain.
            </p>
          </div>
          <ul className="space-y-5">
            {[
              'Lower approach angle protects asphalt and pavers',
              'Faster placement — most drops take under 10 minutes',
              'Better maneuverability on tight urban and residential lots',
              'Quieter loading, less disruption to neighbors and crews',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-ink-900/10 p-5 dark:border-white/10">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <span className="text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
