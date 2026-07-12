'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { dumpsterSizes, materials } from '@/lib/dumpsters';
import { CheckIcon, ArrowRightIcon } from './icons';

const RENTAL_DAYS = [3, 7, 10, 14];

function estimatePrice(sizeId: string, days: number, material: string) {
  const size = dumpsterSizes.find((s) => s.id === sizeId) ?? dumpsterSizes[1];
  const included = 7;
  const extraDays = Math.max(0, days - included);
  const dailyRate = 12;
  const materialSurcharge = material === 'concrete' ? 85 : material === 'roofing' ? 20 : 0;
  const total = size.basePrice + extraDays * dailyRate + materialSurcharge;
  return { size, total };
}

export default function InstantQuoteCalculator() {
  const searchParams = useSearchParams();
  const [sizeId, setSizeId] = useState(dumpsterSizes[1].id);
  const [days, setDays] = useState(7);
  const [zip, setZip] = useState('');
  const [material, setMaterial] = useState(materials[0].id);
  const [step, setStep] = useState<'calc' | 'details' | 'success'>('calc');
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const paramSize = searchParams.get('size');
    if (paramSize && dumpsterSizes.some((s) => s.id === paramSize)) setSizeId(paramSize);
  }, [searchParams]);

  const { size, total } = useMemo(() => estimatePrice(sizeId, days, material), [sizeId, days, material]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.phone || !zip) {
      setError('Please fill in your name, phone, and delivery ZIP.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, zip, sizeId, days, material, estimate: total }),
      });
      if (!res.ok) throw new Error('failed');
      setStep('success');
    } catch {
      setError('Something went wrong submitting your quote. Please call us instead.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-ink-900/10 bg-white shadow-lift dark:border-white/10 dark:bg-ink-800 md:grid md:grid-cols-5">
      <div className="p-8 md:col-span-3 md:p-10">
        {step !== 'success' ? (
          <>
            <p className="eyebrow">Step {step === 'calc' ? '1' : '2'} of 2</p>
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              {step === 'calc' ? 'Build your quote' : 'Where do we send it?'}
            </h3>

            {step === 'calc' && (
              <div className="mt-8 space-y-7">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
                    Dumpster Size
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {dumpsterSizes.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSizeId(s.id)}
                        className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                          sizeId === s.id
                            ? 'border-yellow-500 bg-yellow-500/10'
                            : 'border-ink-900/10 hover:border-ink-900/25 dark:border-white/10'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
                    Rental Length
                  </label>
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {RENTAL_DAYS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDays(d)}
                        className={`rounded-xl border p-3 text-sm font-semibold transition-all ${
                          days === d
                            ? 'border-yellow-500 bg-yellow-500/10'
                            : 'border-ink-900/10 hover:border-ink-900/25 dark:border-white/10'
                        }`}
                      >
                        {d} days
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
                      Material
                    </label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="mt-3 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
                    >
                      {materials.map((m) => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-500 dark:text-ink-300">
                      Delivery ZIP
                    </label>
                    <input
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      inputMode="numeric"
                      placeholder="18101"
                      className="mt-3 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('details')}
                  disabled={!zip || zip.length < 5}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 'details' && (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
                />
                <input
                  placeholder="Delivery Address (optional)"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
                />
                {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('calc')}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button type="submit" disabled={submitting} className="btn-primary flex-1 disabled:opacity-60">
                    {submitting ? 'Submitting…' : 'Get My Quote'}
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex h-full flex-col justify-center py-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
              <CheckIcon className="h-7 w-7" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              Quote request received.
            </h3>
            <p className="mt-3 text-ink-500 dark:text-ink-300">
              A CR Disposal dispatcher will call or text you at <strong>{form.phone}</strong> within
              the hour to confirm pricing and schedule delivery. Need it faster? Call us directly.
            </p>
          </motion.div>
        )}
      </div>

      <div className="rounded-b-3xl bg-ink-900 p-8 text-white md:col-span-2 md:rounded-l-none md:rounded-r-3xl md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Your Estimate</p>
        <p className="mt-4 font-display text-5xl font-extrabold tracking-tight">
          ${total}
          <span className="text-lg font-medium text-white/40"> est.</span>
        </p>
        <div className="mt-8 space-y-4 text-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-white/50">Dumpster</span>
            <span className="font-semibold">{size.size}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-white/50">Rental Length</span>
            <span className="font-semibold">{days} days</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-white/50">Included Weight</span>
            <span className="font-semibold">{size.capacityTons} tons</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/50">Delivery Area</span>
            <span className="font-semibold">{zip || 'Lehigh Valley'}</span>
          </div>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-white/40">
          Final pricing confirmed at booking. Overage billed at a flat per-ton rate — no hidden
          fuel or environmental surcharges.
        </p>
      </div>
    </div>
  );
}
