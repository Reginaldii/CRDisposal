import { EstimateFormData } from '../types';

export default function Step8Notes({
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
          Anything else?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Completely optional.</p>
      </div>

      <textarea
        rows={6}
        placeholder="e.g. gate code, best time to call, fragile items..."
        value={data.notes}
        onChange={(e) => update({ notes: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />
    </div>
  );
}
