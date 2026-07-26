import { EstimateFormData } from '../types';
import { propertyTypes, dateOptions } from '@/lib/estimate';

export default function Step4AddressTiming({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Where and when?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">So we know where to send the truck.</p>
      </div>

      <input
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
              className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
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

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
          Preferred Date
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {dateOptions.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => update({ dateOption: d.id })}
              className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
                data.dateOption === d.id
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-ink-900/10 hover:border-ink-900/25 dark:border-white/10'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        {data.dateOption === 'choose' && (
          <input
            type="date"
            value={data.chosenDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => update({ chosenDate: e.target.value })}
            className="mt-3 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
          />
        )}
      </div>
    </div>
  );
}
