import { EstimateFormData } from '../types';
import { itemCategories } from '@/lib/estimate';

export default function Step1Items({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  function toggle(id: string) {
    const has = data.items.includes(id);
    update({ items: has ? data.items.filter((i) => i !== id) : [...data.items, id] });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          What needs to go?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Tap everything that applies — no typing needed.</p>
      </div>

      <div className="max-h-[420px] space-y-6 overflow-y-auto pr-1">
        {itemCategories.map((cat) => (
          <div key={cat.id}>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">{cat.label}</p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {cat.items.map((item) => {
                const selected = data.items.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                      selected
                        ? 'border-yellow-500 bg-yellow-500/10 text-ink-900 dark:text-white'
                        : 'border-ink-900/10 text-ink-700 hover:border-ink-900/25 dark:border-white/10 dark:text-ink-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {data.items.length > 0 && (
        <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
          {data.items.length} item{data.items.length === 1 ? '' : 's'} selected
        </p>
      )}
    </div>
  );
}
