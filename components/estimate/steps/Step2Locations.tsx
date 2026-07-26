import { EstimateFormData } from '../types';
import { itemLocations } from '@/lib/estimate';
import { CheckIcon } from '../../icons';

export default function Step2Locations({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  function toggle(id: string) {
    const has = data.locations.includes(id);
    update({ locations: has ? data.locations.filter((l) => l !== id) : [...data.locations, id] });
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Where are the items?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Select everywhere that applies.</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {itemLocations.map((loc) => {
          const selected = data.locations.includes(loc.id);
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => toggle(loc.id)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                selected
                  ? 'border-yellow-500 bg-yellow-500/10 text-ink-900 dark:text-white'
                  : 'border-ink-900/10 text-ink-700 hover:border-ink-900/25 dark:border-white/10 dark:text-ink-200'
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  selected ? 'border-yellow-500 bg-yellow-500' : 'border-ink-900/25 dark:border-white/25'
                }`}
              >
                {selected && <CheckIcon className="h-3 w-3 text-ink-900" />}
              </span>
              {loc.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
