import { EstimateFormData } from '../types';
import { itemCategories } from '@/lib/items';

export default function Step1Items({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  function setQuantity(itemId: string, quantity: number) {
    const next = { ...data.itemQuantities };
    if (quantity <= 0) {
      delete next[itemId];
    } else {
      next[itemId] = quantity;
    }
    update({ itemQuantities: next });
  }

  const totalItems = Object.values(data.itemQuantities).reduce((sum, q) => sum + q, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          What needs to go?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
          Tap + to add each item, and how many.
        </p>
      </div>

      <div className="max-h-[420px] space-y-6 overflow-y-auto pr-1">
        {itemCategories.map((cat) => (
          <div key={cat.id}>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">{cat.label}</p>
            <div className="space-y-2">
              {cat.items.map((item) => {
                const qty = data.itemQuantities[item.id] ?? 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 transition-all ${
                      qty > 0
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-ink-900/10 dark:border-white/10'
                    }`}
                  >
                    <span className="text-sm font-medium text-ink-800 dark:text-ink-100">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.label}`}
                        onClick={() => setQuantity(item.id, qty - 1)}
                        disabled={qty === 0}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-900/15 text-lg font-bold leading-none disabled:opacity-30 dark:border-white/15"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-semibold tabular-nums">{qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.label}`}
                        onClick={() => setQuantity(item.id, qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold leading-none text-ink-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {data.itemQuantities['other'] > 0 && (
        <input
          autoFocus
          placeholder="What else? (e.g. old fence panels, pool liner...)"
          value={data.otherDescription}
          onChange={(e) => update({ otherDescription: e.target.value })}
          className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
        />
      )}

      {totalItems > 0 && (
        <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
          {totalItems} item{totalItems === 1 ? '' : 's'} selected
        </p>
      )}
    </div>
  );
}
