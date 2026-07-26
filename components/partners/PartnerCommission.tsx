import { CheckIcon } from '../icons';

const points = [
  'Approved referral partners earn 10% of every completed job they personally refer.',
  'Commissions are paid after payment has been received from the customer.',
  'There is no limit to the number of referrals.',
];

export default function PartnerCommission() {
  return (
    <section className="section bg-ink-50 dark:bg-ink-800">
      <div className="container-x">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink-900/10 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-ink-900 md:p-12">
          <p className="eyebrow">Referral Commission</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Simple, transparent, and worth your time.
          </h2>
          <ul className="mt-8 space-y-5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3.5">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <span className="text-[15px] leading-relaxed text-ink-700 dark:text-ink-200">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
