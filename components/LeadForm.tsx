'use client';

import { useState } from 'react';
import { compressImage } from '@/lib/compressImage';
import { ArrowRightIcon, CheckIcon, PhoneIcon } from './icons';
import { site } from '@/lib/site';

type Photo = { name: string; dataUrl: string };

const jobTypes = [
  'Home or property cleanout',
  'Rental or estate cleanout',
  'Construction or renovation debris',
  'Commercial or recurring hauling',
  'Furniture, appliances, or bulky items',
  'Something else',
];

export default function LeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', zip: '', jobType: '', timeframe: '', description: '' });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'submitting' | 'success' | 'error'>('idle');

  async function addPhotos(files: FileList | null) {
    if (!files) return;
    setStatus('processing');
    try {
      const selected = Array.from(files).slice(0, Math.max(0, 4 - photos.length));
      const compressed = await Promise.all(selected.map(async (file) => ({ name: file.name, dataUrl: await compressImage(file) })));
      setPhotos((current) => [...current, ...compressed].slice(0, 4));
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, photos }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-ink-900/10 bg-white p-10 text-center shadow-soft dark:border-white/10 dark:bg-ink-900">
        <CheckIcon className="mx-auto h-10 w-10 text-yellow-500" />
        <h3 className="mt-5 font-display text-2xl font-extrabold">Your request is in.</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-500 dark:text-ink-300">We&apos;ll review the job details and contact you directly. For urgent work, call or text us.</p>
        <a href={site.phoneHref} className="btn-primary mt-6"><PhoneIcon className="h-4 w-4" />{site.phone}</a>
      </div>
    );
  }

  const fieldClass = 'w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-yellow-500 dark:border-white/10 dark:bg-ink-900';

  return (
    <form onSubmit={submit} className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift dark:border-white/10 dark:bg-ink-900 sm:p-8 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">Name<input required className={`${fieldClass} mt-2`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="text-sm font-semibold">Phone<input required type="tel" className={`${fieldClass} mt-2`} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label className="text-sm font-semibold">Email <span className="font-normal text-ink-400">(optional)</span><input type="email" className={`${fieldClass} mt-2`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="text-sm font-semibold">ZIP code<input required inputMode="numeric" maxLength={5} className={`${fieldClass} mt-2`} value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, '') })} /></label>
        <label className="text-sm font-semibold sm:col-span-2">What kind of job is this?
          <select required className={`${fieldClass} mt-2`} value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}>
            <option value="">Choose one</option>{jobTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold sm:col-span-2">When do you need it done? <span className="font-normal text-ink-400">(optional)</span><input className={`${fieldClass} mt-2`} placeholder="Example: this week, by August 30, flexible" value={form.timeframe} onChange={(e) => setForm({ ...form, timeframe: e.target.value })} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Tell us what needs to be removed<textarea required rows={5} className={`${fieldClass} mt-2 resize-y`} placeholder="Describe the amount, where it is located, stairs or access details, and anything unusually heavy." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Add photos <span className="font-normal text-ink-400">(optional, up to 4)</span><input type="file" accept="image/*" multiple className={`${fieldClass} mt-2 file:mr-4 file:rounded-full file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:font-semibold`} onChange={(e) => addPhotos(e.target.files)} /></label>
      </div>
      {photos.length > 0 && <p className="mt-3 text-sm text-ink-500">{photos.length} photo{photos.length === 1 ? '' : 's'} ready to send.</p>}
      {status === 'error' && <p className="mt-4 text-sm font-semibold text-red-600">The form could not be sent. Please call or text {site.phone}.</p>}
      <button type="submit" disabled={status === 'processing' || status === 'submitting'} className="btn-primary mt-7 w-full disabled:opacity-60">
        {status === 'processing' ? 'Preparing photos…' : status === 'submitting' ? 'Sending…' : 'Request My Estimate'} <ArrowRightIcon className="h-4 w-4" />
      </button>
      <p className="mt-4 text-center text-xs leading-relaxed text-ink-400">No automatic bargain quote. We review the actual job so the estimate reflects the work involved.</p>
    </form>
  );
}
