import { EstimateFormData } from '../types';
import { truckFillLevels } from '@/lib/estimate';
import TruckIllustration from '../TruckIllustration';

export default function Step6TruckFill({
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
          About how much space?
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
          Compared to our dump truck — no measuring required.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {truckFillLevels.map((level) => {
          const selected = data.truckFill === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => update({ truckFill: level.id })}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                selected
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-ink-900/10 hover:border-ink-900/25 dark:border-white/10'
              }`}
            >
              <TruckIllustration fill={level.fill} active={selected} />
              <span className="text-sm font-semibold">{level.label}</span>
              <span className="text-xs leading-snug text-ink-500 dark:text-ink-400">{level.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
