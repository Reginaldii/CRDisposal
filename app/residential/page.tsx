import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { CheckIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Residential Dumpster Rentals — Lehigh Valley, PA',
  description:
    'Homeowner-friendly dumpster rentals for cleanouts, remodels, and yard projects across the Lehigh Valley. Driveway-safe delivery, simple online booking.',
  alternates: { canonical: '/residential' },
};

const projects = [
  'Garage & basement cleanouts',
  'Kitchen & bathroom remodels',
  'Estate & full-property cleanouts',
  'Landscaping & yard waste',
  'Moving & downsizing',
  'Storm & flood cleanup',
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential"
        title="A dumpster that fits your driveway, not just your project."
        subtitle="Simple online booking, careful placement, and a flat price with no fine print — built for homeowners tackling a remodel, cleanout, or big yard project."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Common Projects</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Whatever the job, there&apos;s a size for it.
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p} className="flex items-center gap-2.5 rounded-xl border border-ink-900/10 px-4 py-3 text-sm font-medium dark:border-white/10">
                  <CheckIcon className="h-4 w-4 shrink-0 text-yellow-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <PhotoPlaceholder label="Residential Driveway Delivery" variant="yellow" ratio="aspect-[4/3]" />
        </div>
      </section>

      <section className="section bg-ink-50 dark:bg-ink-800">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">How It Works</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Booked in minutes, delivered on time.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { title: 'Pick your size', desc: 'Use our calculator or call — we’ll help you avoid overpaying for space you don’t need.' },
              { title: 'Schedule delivery', desc: 'Choose a same-day or next-day window that works around your schedule.' },
              { title: 'Fill & call for pickup', desc: 'Load at your own pace, then text or call — pickup within 24 hours.' },
            ].map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white p-7 shadow-soft dark:bg-ink-900">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-ink-900">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Get your home project moving." subtitle="Book online in minutes or call and we'll walk you through sizing and pricing." />
    </>
  );
}
