import { EstimateFormData } from '../types';
import { itemCategories, specialConditions, truckFillLevels, propertyTypes, dateOptions } from '@/lib/estimate';
import { CheckIcon } from '../../icons';

const allItems = itemCategories.flatMap((c) => c.items);

function labelFor(list: { id: string; label: string }[], id: string) {
  return list.find((x) => x.id === id)?.label ?? id;
}

export default function Step9Review({ data }: { data: EstimateFormData }) {
  const itemLabels = data.items.map((id) => labelFor(allItems, id));
  const conditionLabels = data.conditions.map((id) => labelFor(specialConditions, id));
  const truckLabel = labelFor(truckFillLevels, data.truckFill);
  const propertyLabel = labelFor(propertyTypes, data.propertyType);
  const dateLabel =
    data.dateOption === 'choose' && data.chosenDate
      ? new Date(data.chosenDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      : labelFor(dateOptions, data.dateOption);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">Review &amp; submit.</h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Here&apos;s what we&apos;ll send over.</p>
      </div>

      <dl className="divide-y divide-ink-900/8 rounded-2xl border border-ink-900/10 dark:divide-white/10 dark:border-white/10">
        {[
          ['Name', data.name || '—'],
          ['Phone', data.phone || '—'],
          ['Address', [data.address, data.city, data.zip].filter(Boolean).join(', ') || '—'],
          ['Property', propertyLabel],
          ['Items', itemLabels.length ? itemLabels.join(', ') : 'None selected'],
          ['Truck Space', truckLabel || '—'],
          ['Conditions', conditionLabels.length ? conditionLabels.join(', ') : 'None'],
          ['Preferred Date', dateLabel || '—'],
          ['Photos', `${data.photos.length} attached`],
          ['Notes', data.notes || '—'],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">{label}</dt>
            <dd className="text-sm text-ink-700 dark:text-ink-200 sm:text-right">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-start gap-2.5 rounded-xl bg-yellow-500/10 p-4 text-sm text-ink-700 dark:text-ink-200">
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600 dark:text-yellow-400" />
        Free estimate — we&apos;ll follow up by your preferred contact method, usually within the hour.
      </div>
    </div>
  );
}
