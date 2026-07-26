import { EstimateFormData } from '../types';
import { contactPreferences, itemCategories, truckFillLevels } from '@/lib/estimate';
import { CheckIcon } from '../../icons';

const allItems = itemCategories.flatMap((c) => c.items);

function labelFor(list: { id: string; label: string }[], id: string) {
  return list.find((x) => x.id === id)?.label ?? id;
}

export default function Step5ContactSubmit({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  const itemLabels = data.items
    .map((id) => (id === 'other' && data.otherDescription ? data.otherDescription : labelFor(allItems, id)));
  const truckLabel = labelFor(truckFillLevels, data.truckFill);

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

      <div className="rounded-2xl border border-ink-900/10 bg-ink-50 p-4 text-sm dark:border-white/10 dark:bg-ink-900">
        <p className="flex items-center gap-2 font-semibold">
          <CheckIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          {itemLabels.length ? itemLabels.join(', ') : 'No items selected'} · {truckLabel || 'Size TBD'}
        </p>
        <p className="mt-1 text-ink-500 dark:text-ink-300">
          Free estimate — we&apos;ll follow up by your preferred contact method, usually within the hour.
        </p>
      </div>
    </div>
  );
}
