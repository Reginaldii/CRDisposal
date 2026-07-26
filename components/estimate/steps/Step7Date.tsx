import { EstimateFormData } from '../types';
import { dateOptions } from '@/lib/estimate';

export default function Step7Date({
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
          When works best?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">We&apos;ll confirm the exact window with you.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {dateOptions.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => update({ dateOption: d.id })}
            className={`rounded-xl border py-4 text-sm font-semibold transition-all ${
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
          className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
        />
      )}
    </div>
  );
}
