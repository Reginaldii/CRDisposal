import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { dumpsterSizes } from '@/lib/dumpsters';
import { CheckIcon, ArrowRightIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Pricing — Transparent Dumpster Rental Rates',
  description:
    'Flat-rate dumpster rental pricing for the Lehigh Valley, PA. No hidden fuel surcharges or environmental fees. See pricing for every dumpster size.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="One flat rate. No fine print."
        subtitle="Every quote includes delivery, pickup, and a set tonnage allowance. What we quote is what you pay — overage is billed at one simple per-ton rate."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x">
          <div className="overflow-x-auto rounded-3xl border border-ink-900/10 dark:border-white/10">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/10 bg-ink-50 dark:border-white/10 dark:bg-ink-800">
                  <th className="px-6 py-4 font-semibold">Size</th>
                  <th className="px-6 py-4 font-semibold">Dimensions</th>
                  <th className="px-6 py-4 font-semibold">Included Weight</th>
                  <th className="px-6 py-4 font-semibold">Rental Period</th>
                  <th className="px-6 py-4 font-semibold">Starting Price</th>
                  <th className="px-6 py-4 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {dumpsterSizes.map((s) => (
                  <tr key={s.id} className="border-b border-ink-900/8 last:border-0 dark:border-white/10">
                    <td className="px-6 py-5 font-semibold">{s.size}</td>
                    <td className="px-6 py-5 text-ink-500 dark:text-ink-300">{s.dims}</td>
                    <td className="px-6 py-5 text-ink-500 dark:text-ink-300">{s.capacityTons} tons</td>
                    <td className="px-6 py-5 text-ink-500 dark:text-ink-300">7 days</td>
                    <td className="px-6 py-5 font-bold">${s.basePrice}</td>
                    <td className="px-6 py-5">
                      <Link href={`/quote?size=${s.id}`} className="text-sm font-semibold text-yellow-600 hover:underline dark:text-yellow-400">
                        Get Quote →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-ink-400">
            Prices shown are starting rates for standard delivery zones. Final pricing may vary by
            ZIP code, material, and rental length — confirmed before booking, always.
          </p>
        </div>
      </section>

      <section className="section bg-ink-50 dark:bg-ink-800">
        <div className="container-x grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'What’s Included', desc: 'Delivery, pickup, and disposal up to your tonnage allowance.' },
            { title: 'Extra Days', desc: 'Simple flat daily rate if you need the container longer.' },
            { title: 'Overage', desc: 'One flat per-ton rate for weight beyond your included allowance.' },
            { title: 'No Surprise Fees', desc: 'No fuel surcharges, no environmental fees, no fine print.' },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl bg-white p-6 shadow-soft dark:bg-ink-900">
              <CheckIcon className="h-5 w-5 text-yellow-500" />
              <h3 className="mt-4 font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Get an exact price for your project." subtitle="Answer four quick questions and we'll show you a real number — not a range." />
    </>
  );
}
