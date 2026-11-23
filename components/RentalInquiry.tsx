'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

export default function RentalInquiry() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', date: '', days: '', debris: '', notes: '' });
  const field = 'mt-1.5 w-full rounded-xl border border-ink-900/20 bg-white px-4 py-3 text-base text-ink-900 focus:border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/40';
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'Not provided'}\nDelivery address or ZIP: ${form.location}\nPreferred delivery date: ${form.date || 'Flexible'}\nRental duration: ${form.days || 'Not sure'}\nMaterials: ${form.debris}\nNotes: ${form.notes || 'None'}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('16-yard rental quote request')}&body=${encodeURIComponent(body)}`;
  }
  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-6 text-ink-900 shadow-2xl md:p-8">
      <h3 className="font-display text-2xl font-extrabold">Request a rental quote</h3>
      <p className="text-sm text-ink-600">This opens your email app with your request. Send the email to complete your inquiry; it does not reserve the trailer.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold">Name <input className={field} required autoComplete="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></label>
        <label className="text-sm font-bold">Phone <input className={field} required type="tel" autoComplete="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></label>
        <label className="text-sm font-bold">Email (optional) <input className={field} type="email" autoComplete="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></label>
        <label className="text-sm font-bold">Delivery address or ZIP <input className={field} required value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></label>
        <label className="text-sm font-bold">Preferred delivery date <input className={field} type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></label>
        <label className="text-sm font-bold">How long do you need it? <select className={field} value={form.days} onChange={e => setForm({...form, days: e.target.value})}><option value="">Not sure yet</option><option>Up to 3 days</option><option>Up to 5 days</option><option>Up to 7 days</option><option>Other</option></select></label>
      </div>
      <label className="block text-sm font-bold">What are you throwing away? <textarea className={field} required rows={3} value={form.debris} onChange={e => setForm({...form, debris: e.target.value})} /></label>
      <label className="block text-sm font-bold">Placement or access notes (optional) <textarea className={field} rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></label>
      <button className="btn-primary w-full" type="submit">Open email to request a quote</button>
      <p className="text-sm text-ink-600">No email app? Call <a className="font-bold underline" href={site.phoneHref}>{site.phone}</a> or email <a className="font-bold underline break-all" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </form>
  );
}
