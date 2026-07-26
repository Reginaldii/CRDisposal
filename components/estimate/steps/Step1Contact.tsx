import { EstimateFormData } from '../types';
import { contactPreferences } from '@/lib/estimate';

export default function Step1Contact({
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
          Let&apos;s get your info.
        </h3>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">Takes about 15 seconds.</p>
      </div>

      <input
        placeholder="Full Name"
        value={data.name}
        onChange={(e) => update({ name: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={data.phone}
        onChange={(e) => update({ phone: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />
      <input
        type="email"
        placeholder="Email Address (optional)"
        value={data.email}
        onChange={(e) => update({ email: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-base dark:border-white/10 dark:bg-ink-900"
      />

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
          Preferred Contact
        </label>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {contactPreferences.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => update({ contactPreference: c.id })}
              className={`rounded-xl border py-3.5 text-sm font-semibold transition-all ${
                data.contactPreference === c.id
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-ink-900/10 hover:border-ink-900/25 dark:border-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
