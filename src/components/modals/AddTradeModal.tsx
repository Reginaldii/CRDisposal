import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

export function AddTradeModal() {
  const { addTrade, setModalOpen, selectedDate } = useApp();
  const today = format(new Date(), 'yyyy-MM-dd');

  const [form, setForm] = useState({
    date: selectedDate ?? today,
    symbol: '',
    side: 'long' as 'long' | 'short',
    pnl: '',
    quantity: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pnl = parseFloat(form.pnl);
    if (isNaN(pnl)) return;
    addTrade({
      date: form.date,
      symbol: form.symbol.toUpperCase() || 'UNKNOWN',
      side: form.side,
      pnl,
      quantity: form.quantity ? parseFloat(form.quantity) : undefined,
      notes: form.notes || undefined,
    });
    setModalOpen(null);
  };

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(null)}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Add Trade</h2>
          <button onClick={() => setModalOpen(null)} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
          {/* Date */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Symbol */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Symbol</label>
            <input
              type="text"
              placeholder="SPY, TSLA, ES..."
              value={form.symbol}
              onChange={e => set('symbol', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 uppercase"
            />
          </div>

          {/* Side */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Side</label>
            <div className="flex gap-2">
              {(['long', 'short'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set('side', s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    form.side === s
                      ? s === 'long' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* P&L */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">P&L ($)</label>
            <input
              type="number"
              placeholder="+500 or -120"
              value={form.pnl}
              onChange={e => set('pnl', e.target.value)}
              step="0.01"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Quantity (optional)</label>
            <input
              type="number"
              placeholder="100 shares, 1 contract..."
              value={form.quantity}
              onChange={e => set('quantity', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Notes (optional)</label>
            <textarea
              placeholder="Setup, entry reason, lessons..."
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              rows={2}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition-colors mt-1"
          >
            Add Trade
          </button>
        </form>
      </div>
    </div>
  );
}
