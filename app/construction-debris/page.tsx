import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { CheckIcon, RecycleIcon, BuildingIcon, TruckIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Construction Debris Hauling — Lehigh Valley, PA',
  description:
    'Heavy debris hauling for new construction, demolition, and renovation sites across the Lehigh Valley. Concrete, drywall, wood, and mixed C&D debris.',
  alternates: { canonical: '/construction-debris' },
};

const debrisTypes = [
  { label: 'Concrete, Brick & Asphalt', desc: 'Dedicated heavy-debris containers rated for the weight.' },
  { label: 'Wood & Framing Lumber', desc: 'Scrap lumber, pallets, and framing waste from new builds.' },
  { label: 'Drywall & Insulation', desc: 'Clean disposal that keeps job sites OSHA-tidy.' },
  { label: 'Metal & Wire', desc: 'Separated where possible to reduce your total haul cost.' },
  { label: 'Roofing Materials', desc: 'Shingles, underlayment, and flashing from tear-offs.' },
  { label: 'Mixed C&D Debris', desc: 'General construction and demolition waste, combined.' },
];

export default function ConstructionDebrisPage() {
  return (
    <>
      <PageHero
        eyebrow="Construction Debris"
        title="Heavy hauling for serious job sites."
        subtitle="New construction, teardown, or full demolition — we size the container to the load and keep your site moving without waiting on a truck."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {debrisTypes.map((d) => (
            <div key={d.label} className="rounded-2xl border border-ink-900/10 p-7 dark:border-white/10">
              <BuildingIcon className="h-7 w-7 text-yellow-500" />
              <h3 className="mt-5 font-semibold tracking-tight">{d.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-ink-50 dark:bg-ink-800">
        <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <PhotoPlaceholder label="Demolition Site Container Service" variant="slate" ratio="aspect-[4/3]" />
          <div>
            <p className="eyebrow">Built for Scale</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              From a single reno to a full development.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500 dark:text-ink-300">
              We coordinate swap schedules for active demolition and new-construction sites,
              rotating containers so your crew is never waiting on hauling to keep working.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                'Scheduled swap-outs for continuous, high-volume debris flow',
                'Heavy-debris containers rated for concrete, brick & asphalt',
                'Recycling sorted where possible to reduce landfill cost',
                'Site safety briefings for placement on active job sites',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                  <span className="text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-4 rounded-3xl bg-ink-900 p-10 text-white sm:grid-cols-3 md:p-14">
            <div className="flex items-start gap-4">
              <RecycleIcon className="h-8 w-8 shrink-0 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Responsible Disposal</h3>
                <p className="mt-1.5 text-sm text-ink-300">Materials sorted and recycled through certified Lehigh Valley facilities where possible.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <TruckIcon className="h-8 w-8 shrink-0 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Multi-Container Coordination</h3>
                <p className="mt-1.5 text-sm text-ink-300">Multiple containers on one site, scheduled around your crew&apos;s timeline.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckIcon className="h-8 w-8 shrink-0 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Weight-Rated Pricing</h3>
                <p className="mt-1.5 text-sm text-ink-300">Flat per-ton overage rates for heavy debris — never a mystery invoice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection title="Get your job site hauling sorted." subtitle="Tell us the material and the timeline — we'll build a hauling plan around it." />
    </>
  );
}
