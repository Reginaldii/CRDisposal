import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { contractorBenefits } from '@/lib/content';
import { CheckIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contractor Dumpster Accounts — Lehigh Valley, PA',
  description:
    'Priority scheduling, account billing, and repeat-customer pricing for contractors, roofers, remodelers, and property managers across the Lehigh Valley.',
  alternates: { canonical: '/contractors' },
};

export default function ContractorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Contractors"
        title="Dumpsters shouldn't be the bottleneck."
        subtitle="Open a contractor account and get priority scheduling, one monthly invoice, and pricing that improves the more you rent — across every crew and every site."
      />

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contractorBenefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-ink-900/10 p-7 dark:border-white/10">
                <CheckIcon className="h-6 w-6 text-yellow-500" />
                <h3 className="mt-5 font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink-50 dark:bg-ink-800">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Open an account',
                desc: 'Tell us your business, typical job volume, and how you bill — takes about five minutes.',
              },
              {
                step: '02',
                title: 'Get approved',
                desc: 'Most accounts are approved same-day, with Net-30 terms available for qualifying businesses.',
              },
              {
                step: '03',
                title: 'Start booking',
                desc: 'Order online or by phone, across as many active sites as you need, all on one invoice.',
              },
            ].map((s) => (
              <div key={s.step}>
                <p className="font-display text-5xl font-extrabold text-yellow-500/40">{s.step}</p>
                <h3 className="mt-4 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500 dark:text-ink-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white dark:bg-ink-900">
        <div className="container-x">
          <div className="overflow-x-auto rounded-3xl border border-ink-900/10 dark:border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/10 bg-ink-50 dark:border-white/10 dark:bg-ink-800">
                  <th className="px-6 py-4 font-semibold">Benefit</th>
                  <th className="px-6 py-4 font-semibold">Standard Customer</th>
                  <th className="px-6 py-4 font-semibold text-yellow-600 dark:text-yellow-400">Contractor Account</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Scheduling', 'Next available window', 'Priority same/next-day'],
                  ['Billing', 'Pay at delivery', 'Net-30 monthly invoice'],
                  ['Pricing', 'Standard flat rate', 'Volume-based discount'],
                  ['Support', 'General dispatch line', 'Dedicated account manager'],
                  ['Multi-site', 'One site per order', 'Coordinated across all sites'],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-ink-900/8 last:border-0 dark:border-white/10">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-6 py-4 ${i === 2 ? 'font-semibold text-ink-900 dark:text-white' : 'text-ink-500 dark:text-ink-300'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTASection title="Open your contractor account." subtitle="Call our team or submit a quote request and we'll set up your account within the hour." />
    </>
  );
}
