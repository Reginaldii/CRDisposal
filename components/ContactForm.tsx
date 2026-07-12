'use client';

import { useState } from 'react';
import { ArrowRightIcon, CheckIcon } from './icons';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
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
      <div className="flex flex-col items-start rounded-3xl border border-ink-900/10 bg-white p-10 dark:border-white/10 dark:bg-ink-800">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600 dark:text-yellow-400">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight">Message sent.</h3>
        <p className="mt-2 text-ink-500 dark:text-ink-300">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-ink-900/10 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-ink-800 md:p-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
        />
      </div>
      <input
        required
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
      />
      <textarea
        required
        placeholder="How can we help?"
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
      />
      {status === 'error' && <p className="text-sm font-medium text-red-600">Something went wrong. Please call us instead.</p>}
      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
