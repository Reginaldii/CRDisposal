import { TOTAL_STEPS } from './types';

export default function StepIndicator({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-ink-400">
        <span>
          Step {step} of {TOTAL_STEPS}
        </span>
        <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/8 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-yellow-500 transition-all duration-300 ease-out"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );
}
