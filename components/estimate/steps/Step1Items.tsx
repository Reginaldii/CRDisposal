'use client';

import { useMemo, useState } from 'react';
import { EstimateFormData } from '../types';
import { itemCategories, popularItems, allItems, findItem } from '@/lib/items';
import { jobPresets } from '@/lib/jobPresets';
import { ChevronDownIcon, SearchIcon } from '../../icons';

function QuantityChips({
  qty,
  label,
  onChange,
}: {
  qty: number;
  label: string;
  onChange: (q: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Set ${label} quantity to ${n}`}
          onClick={() => onChange(qty === n ? 0 : n)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
            qty === n
              ? 'border-yellow-500 bg-yellow-500 text-ink-900'
              : 'border-ink-900/15 text-ink-600 dark:border-white/15 dark:text-ink-300'
          }`}
        >
          {n}
        </button>
      ))}
      {qty >= 5 ? (
        <div className="flex items-center gap-1 rounded-full border border-yellow-500 bg-yellow-500/10 px-1">
          <button
            type="button"
            aria-label={`Decrease ${label}`}
            onClick={() => onChange(qty - 1)}
            className="flex h-8 w-6 items-center justify-center text-base font-bold leading-none"
          >
            −
          </button>
          <span className="w-4 text-center text-sm font-semibold tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label={`Increase ${label}`}
            onClick={() => onChange(qty + 1)}
            className="flex h-8 w-6 items-center justify-center text-base font-bold leading-none"
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label={`Set ${label} quantity to 5 or more`}
          onClick={() => onChange(5)}
          className="flex h-8 items-center justify-center rounded-full border border-ink-900/15 px-2 text-xs font-semibold text-ink-600 dark:border-white/15 dark:text-ink-300"
        >
          5+
        </button>
      )}
    </div>
  );
}

export default function Step1Items({
  data,
  update,
}: {
  data: EstimateFormData;
  update: (patch: Partial<EstimateFormData>) => void;
}) {
  const [query, setQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [activePreset, setActivePreset] = useState<string | null>(null);

  function setQuantity(itemId: string, quantity: number) {
    const next = { ...data.itemQuantities };
    if (quantity <= 0) {
      delete next[itemId];
    } else {
      next[itemId] = quantity;
    }
    update({ itemQuantities: next });
  }

  function toggleCategory(id: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function applyPreset(presetId: string, categories: string[]) {
    if (activePreset === presetId) {
      setActivePreset(null);
      setOpenCategories(new Set());
    } else {
      setActivePreset(presetId);
      setOpenCategories(new Set(categories));
    }
  }

  const totalItems = Object.values(data.itemQuantities).reduce((sum, q) => sum + q, 0);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  if (data.skipItemList) {
    return (
      <div className="space-y-5">
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          What needs to go?
        </h3>
        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5">
          <p className="font-semibold text-ink-800 dark:text-ink-100">
            No problem — we&apos;ll figure it out from your photos.
          </p>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
            Add a few photos in the next step. A quick description helps too, but isn&apos;t
            required.
          </p>
          <textarea
            rows={2}
            placeholder="e.g. Garage full of old furniture and boxes (optional)"
            value={data.unknownItemsNote}
            onChange={(e) => update({ unknownItemsNote: e.target.value })}
            className="mt-3 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
          />
          <button
            type="button"
            onClick={() => update({ skipItemList: false })}
            className="mt-3 text-sm font-semibold text-yellow-600 underline dark:text-yellow-400"
          >
            Actually, let me pick items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          What needs to go?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
          Search, tap a common item, or browse by category.
        </p>
      </div>

      <button
        type="button"
        onClick={() => update({ skipItemList: true })}
        className="w-full rounded-xl border border-dashed border-ink-900/20 py-2.5 text-sm font-semibold text-ink-600 hover:border-yellow-500 dark:border-white/20 dark:text-ink-300"
      >
        Not sure? I Don&apos;t Know What&apos;s Here
      </button>

      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items…"
          className="w-full rounded-xl border border-ink-900/10 bg-white py-3 pl-10 pr-4 text-sm dark:border-white/10 dark:bg-ink-900"
        />
      </div>

      {query.trim() ? (
        <div className="max-h-[380px] space-y-2 overflow-y-auto pr-1">
          {searchResults.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink-400">
              No items match &quot;{query}&quot;.
            </p>
          ) : (
            searchResults.map((item) => {
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
                  <span className="text-sm font-medium text-ink-800 dark:text-ink-100">
                    {item.label}
                  </span>
                  <QuantityChips qty={qty} label={item.label} onChange={(q) => setQuantity(item.id, q)} />
                </div>
              );
            })
          )}
        </div>
      ) : (
        <>
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              What best describes your job?
            </p>
            <div className="flex flex-wrap gap-2">
              {jobPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id, preset.categories)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                    activePreset === preset.id
                      ? 'border-yellow-500 bg-yellow-500/10 text-ink-900 dark:text-white'
                      : 'border-ink-900/10 text-ink-600 hover:border-ink-900/25 dark:border-white/10 dark:text-ink-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              Most Common
            </p>
            <div className="grid grid-cols-3 gap-2">
              {popularItems.map((p) => {
                const item = findItem(p.id);
                if (!item) return null;
                const qty = data.itemQuantities[p.id] ?? 0;
                return (
                  <div
                    key={p.id}
                    className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition-all ${
                      qty > 0
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-ink-900/10 dark:border-white/10'
                    }`}
                  >
                    <span className="text-xl leading-none">{p.emoji}</span>
                    <span className="text-xs font-medium text-ink-800 dark:text-ink-100">
                      {p.label ?? item.label}
                    </span>
                    {qty > 0 ? (
                      <div className="mt-1 flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.label}`}
                          onClick={() => setQuantity(p.id, qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-ink-900/15 text-sm font-bold leading-none dark:border-white/15"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-xs font-semibold tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.label}`}
                          onClick={() => setQuantity(p.id, qty + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold leading-none text-ink-900"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQuantity(p.id, 1)}
                        className="mt-1 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-ink-900"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-h-[340px] space-y-2 overflow-y-auto pr-1">
            {itemCategories.map((cat) => {
              const isOpen = openCategories.has(cat.id);
              const catQty = cat.items.reduce((sum, i) => sum + (data.itemQuantities[i.id] ?? 0), 0);
              return (
                <div key={cat.id} className="rounded-xl border border-ink-900/10 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="text-sm font-semibold text-ink-800 dark:text-ink-100">
                      {cat.label}
                      {catQty > 0 && (
                        <span className="ml-2 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                          {catQty} selected
                        </span>
                      )}
                    </span>
                    <ChevronDownIcon
                      className={`h-4 w-4 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="space-y-2 px-3 pb-3">
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
                            <span className="text-sm font-medium text-ink-800 dark:text-ink-100">
                              {item.label}
                            </span>
                            <QuantityChips
                              qty={qty}
                              label={item.label}
                              onChange={(q) => setQuantity(item.id, q)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

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
