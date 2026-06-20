import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventCategory, ImpactLevel } from '../../types';
import { format } from 'date-fns';

export function AddEventModal() {
  const { addCustomEvent, setModalOpen, selectedDate } = useApp();
  const today = format(new Date(), 'yyyy-MM-dd');

  const [form, setForm] = useState({
    date: selectedDate ?? today,
    title: '',
    shortTitle: '',
    impact: 'high' as ImpactLevel,
    category: 'other' as EventCategory,
    time: '',
    description: '',
    forecast: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    addCustomEvent({
      date: form.date,
      title: form.title,
      shortTitle: form.shortTitle || form.title.slice(0, 10),
      impact: form.impact,
      category: form.category,
      time: form.time || undefined,
      description: form.description || undefined,
      forecast: form.forecast || undefined,
    });
    setModalOpen(null);
  };

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const impacts: ImpactLevel[] = ['high', 'medium', 'low'];
  const categories: { value: EventCategory; label: string }[] = [
    { value: 'fed', label: 'Fed/Monetary' },
    { value: 'employment', label: 'Employment' },
    { value: 'inflation', label: 'Inflation' },
    { value: 'gdp', label: 'GDP' },
    { value: 'earnings', label: 'Earnings' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(null)}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Add News Event</h2>
          <button onClick={() => setModalOpen(null)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Date</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Event Title</label>
            <input type="text" placeholder="e.g. NVDA Earnings" value={form.title} onChange={e => set('title', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" required />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Short Label (calendar dot tooltip)</label>
            <input type="text" placeholder="e.g. NVDA" value={form.shortTitle} onChange={e => set('shortTitle', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Impact</label>
              <div className="flex gap-1">
                {impacts.map(imp => (
                  <button key={imp} type="button" onClick={() => set('impact', imp)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                      form.impact === imp
                        ? imp === 'high' ? 'bg-red-500 text-white' : imp === 'medium' ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'
                        : 'bg-gray-800 text-gray-400'
                    }`}>
                    {imp}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Time (optional)</label>
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
              {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Forecast / Notes (optional)</label>
            <input type="text" placeholder="Expected: 250K jobs..." value={form.forecast} onChange={e => set('forecast', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition-colors mt-1">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
