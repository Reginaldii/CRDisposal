import { TOTAL_STEPS } from './types';

const STEP_LABELS = ['Items', 'Location', 'Photos', 'Timing', 'Contact'];

export default function StepIndicator({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < step;
          const current = stepNum === step;
          return (
            <span
              key={label}
              className={`flex-1 text-center text-[11px] font-semibold ${
                current
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : done
                    ? 'text-ink-500 dark:text-ink-300'
                    : 'text-ink-300 dark:text-ink-600'
              }`}
            >
              {label}
              {done ? ' ✓' : ''}
            </span>
          );
        })}
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
