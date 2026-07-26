import { EstimateFormData } from '../types';
import { propertyTypes } from '@/lib/estimate';

export default function Step2Address({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Where&apos;s the junk?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">So we know where to send the truck.</p>
      </div>

      <input
        autoFocus
        placeholder="Street Address"
        value={data.address}
        onChange={(e) => update({ address: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="City"
          value={data.city}
          onChange={(e) => update({ city: e.target.value })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
        />
        <input
          placeholder="ZIP Code"
          inputMode="numeric"
          value={data.zip}
          onChange={(e) => update({ zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
          Property Type
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {propertyTypes.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => update({ propertyType: p.id })}
              className={`rounded-xl border py-3.5 text-sm font-semibold transition-all ${
                data.propertyType === p.id
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-ink-900/10 hover:border-ink-900/25 dark:border-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
