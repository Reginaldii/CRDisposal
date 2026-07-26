'use client';

import { useState } from 'react';
import { businessTypes, referralSources } from '@/lib/partners';
import { ArrowRightIcon, CheckIcon } from '../icons';

const initialForm = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  website: '',
  businessType: businessTypes[0],
  serviceArea: '',
  referralSource: referralSources[0],
  notes: '',
  agreed: false,
};

export default function PartnerForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function update(patch: Partial<typeof initialForm>) {
    setForm((f) => ({ ...f, ...patch }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agreed) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-ink-900/10 bg-white p-10 text-center shadow-lift dark:border-white/10 dark:bg-ink-800 md:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
          Application received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink-500 dark:text-ink-300">
          We&apos;ll review your application and follow up within a business day to get you set up.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-ink-800 md:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          required
          placeholder="Business Name"
          value={form.businessName}
          onChange={(e) => update({ businessName: e.target.value })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
        />
        <input
          required
          placeholder="Contact Name"
          value={form.contactName}
          onChange={(e) => update({ contactName: e.target.value })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          required
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => update({ phone: e.target.value })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
        />
      </div>

      <input
        placeholder="Website (optional)"
        value={form.website}
        onChange={(e) => update({ website: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
            Business Type
          </label>
          <select
            value={form.businessType}
            onChange={(e) => update({ businessType: e.target.value })}
            className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
          >
            {businessTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
            How did you hear about us?
          </label>
          <select
            value={form.referralSource}
            onChange={(e) => update({ referralSource: e.target.value })}
            className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
          >
            {referralSources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <input
        required
        placeholder="Service Area"
        value={form.serviceArea}
        onChange={(e) => update({ serviceArea: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
      />

      <textarea
        rows={4}
        placeholder="Additional Notes (optional)"
        value={form.notes}
        onChange={(e) => update({ notes: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
      />

      <label className="flex items-start gap-3 text-sm text-ink-600 dark:text-ink-300">
        <input
          required
          type="checkbox"
          checked={form.agreed}
          onChange={(e) => update({ agreed: e.target.checked })}
          className="mt-0.5 h-4 w-4 shrink-0 accent-yellow-500"
        />
        I agree to the CR Disposal Partner Program terms.
      </label>

      {status === 'error' && (
        <p className="text-sm font-medium text-red-600">Something went wrong. Please call or text us instead.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting' || !form.agreed}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting…' : 'Become a Partner'}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
