import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { ShieldIcon, HomeIcon, ClockIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About CR Disposal — Locally Owned in the Lehigh Valley',
  description:
    'CR Disposal is a locally owned dumpster rental and hauling company serving contractors and homeowners across the Lehigh Valley, PA.',
  alternates: { canonical: '/about' },
};

const values = [
  { icon: ShieldIcon, title: 'Do it right', desc: 'Licensed, insured, and held to a higher standard than the guy with a trailer and a Facebook page.' },
  { icon: ClockIcon, title: 'Show up on time', desc: 'We built our dispatch process around one rule: if we say a window, we hit it.' },
  { icon: HomeIcon, title: 'Stay local', desc: 'Every truck, every driver, every dispatcher is based right here in the Lehigh Valley.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CR Disposal"
        title="A dumpster company built by people tired of bad ones."
        subtitle="We started CR Disposal because contractors and homeowners deserved better than late trucks, vague pricing, and dispatchers who never pick up."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <PhotoPlaceholder label="CR Disposal Fleet & Team" variant="dark" ratio="aspect-[4/3]" />
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built on hooklift efficiency and a straight answer.
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">
              <p>
                CR Disposal launched to fix what was broken about dumpster rental in the Lehigh
                Valley: unreliable delivery windows, pricing that changed at pickup, and companies
                too big to care about a single homeowner&apos;s driveway.
              </p>
              <p>
                We invested in a hooklift fleet because it&apos;s faster, safer, and easier on
                driveways than a dragged roll-off — and we built our dispatch process so every
                customer, contractor or homeowner, gets the same straight answer on price and
                timing.
              </p>
              <p>
                Today we serve contractors, property managers, and homeowners across Allentown,
                Bethlehem, Easton, and every town in between — with the same promise we started
                with: show up on time, charge what we quoted, and pick up when you&apos;re done.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50 dark:bg-ink-800">
        <div className="container-x grid grid-cols-1 gap-8 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-8 text-center shadow-soft dark:bg-ink-900">
              <v.icon className="mx-auto h-8 w-8 text-yellow-500" />
              <h3 className="mt-5 font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Work with a team that shows up." subtitle="Get a quote in minutes or call and talk to someone local." />
    </>
  );
}
