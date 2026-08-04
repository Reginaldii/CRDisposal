import { EstimateFormData } from '../types';
import { contactPreferences } from '@/lib/estimate';
import { findItem } from '@/lib/items';
import { estimateJob } from '@/lib/pricingEngine';
import { getPublishedPrice } from '@/lib/publishedPricing';
import { CheckIcon } from '../../icons';

export default function Step5ContactSubmit({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  const itemLabels = Object.entries(data.itemQuantities)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const label = id === 'other' && data.otherDescription ? data.otherDescription : findItem(id)?.label ?? id;
      return qty > 1 ? `${label} x${qty}` : label;
    });

  const estimate = estimateJob({ itemQuantities: data.itemQuantities, accessConditions: data.conditions });
  const hasEstimate = !data.skipItemList;
  const published = hasEstimate ? getPublishedPrice(data.itemQuantities, estimate.truckFillFraction) : null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Last step — where do we send it?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Takes about 15 seconds.</p>
      </div>

      <input
        placeholder="Full Name"
        value={data.name}
        onChange={(e) => update({ name: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={data.phone}
        onChange={(e) => update({ phone: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />
      <input
        type="email"
        placeholder="Email Address (optional)"
        value={data.email}
        onChange={(e) => update({ email: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
          Preferred Contact
        </label>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {contactPreferences.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => update({ contactPreference: c.id })}
              className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
                data.contactPreference === c.id
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-ink-900/10 hover:border-ink-900/25 dark:border-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <textarea
        rows={3}
        placeholder="Anything else? (optional — gate code, best time to call, etc.)"
        value={data.notes}
        onChange={(e) => update({ notes: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />

      <div className="rounded-2xl border border-ink-900/10 bg-ink-50 p-5 text-sm dark:border-white/10 dark:bg-ink-900">
        <p className="flex items-start gap-2 font-semibold leading-relaxed">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600 dark:text-yellow-400" />
          {hasEstimate
            ? itemLabels.length
              ? itemLabels.join(', ')
              : 'No items selected'
            : 'Full photo review requested'}
        </p>

        <div className="mt-4 border-t border-ink-900/10 pt-4 dark:border-white/10">
          {hasEstimate && published ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                Starting At
              </p>
              <p className="mt-1 font-display text-4xl font-extrabold tracking-tight">
                ${published.low}
              </p>
              <p className="mt-1 text-ink-500 dark:text-ink-300">
                Typical range for a job like this: ${published.low} – ${published.high}
              </p>
              <p className="mt-3 text-ink-500 dark:text-ink-300">
                Final price depends on travel, stairs, and disposal — every estimate is
                personally reviewed before it&apos;s final.
              </p>
              <ul className="mt-3 space-y-1.5 text-ink-500 dark:text-ink-300">
                <li className="flex items-center gap-1.5">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
                  Fair pricing
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
                  Fast response
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
                  No surprises
                </li>
              </ul>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                Your Estimate
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold tracking-tight">
                We&apos;ll price it from your photos
              </p>
              <p className="mt-3 text-ink-500 dark:text-ink-300">
                Since you skipped the item list, we&apos;ll personally review your photos and
                description before sending pricing.
              </p>
            </>
          )}
          <p className="mt-3 font-semibold text-ink-700 dark:text-ink-200">
            Expected response time: 15–30 minutes during business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
