import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GoalType } from '../../types';
import { format } from 'date-fns';

const GOAL_TYPES: { value: GoalType; label: string; desc: string }[] = [
  { value: 'daily', label: 'Daily', desc: 'Target P&L per trading day' },
  { value: 'weekly', label: 'Weekly', desc: 'Target P&L per week' },
  { value: 'monthly', label: 'Monthly', desc: 'Target P&L per month' },
  { value: 'yearly', label: 'Yearly', desc: 'Target P&L for the year' },
  { value: 'longterm', label: 'Long-term', desc: 'Total savings/profit target' },
];

const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

export function AddGoalModal() {
  const { addGoal, setModalOpen } = useApp();
  const [form, setForm] = useState({
    type: 'daily' as GoalType,
    label: '',
    target: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    color: COLORS[0],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(form.target);
    if (isNaN(target) || target <= 0) return;
    addGoal({
      type: form.type,
      label: form.label || `${form.type.charAt(0).toUpperCase() + form.type.slice(1)} Goal`,
      target,
      startDate: form.startDate,
      color: form.color,
      description: form.description || undefined,
    });
    setModalOpen(null);
  };

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));
  const selectedTypeInfo = GOAL_TYPES.find(t => t.value === form.type)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(null)}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">New Goal</h2>
          <button onClick={() => setModalOpen(null)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
          {/* Goal type */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Goal Type</label>
            <div className="grid grid-cols-5 gap-1">
              {GOAL_TYPES.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => set('type', t.value)}
                  className={`py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                    form.type === t.value ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">{selectedTypeInfo.desc}</p>
          </div>

          {/* Label */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Label</label>
            <input
              type="text"
              placeholder={`e.g. "${selectedTypeInfo.label} target"`}
              value={form.label}
              onChange={e => set('label', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Target */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Target ($)</label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={form.target}
              onChange={e => set('target', e.target.value)}
              min="1"
              step="1"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Start date (for longterm) */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Start Date</label>
            <input
              type="date"
              value={form.startDate}
              onChange={e => set('startDate', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Color */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Color</label>
            <div className="flex gap-2">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set('color', c)}
                  className={`w-6 h-6 rounded-full transition-all ${form.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Description (optional)</label>
            <input
              type="text"
              placeholder="e.g. Fund the car, retire early..."
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition-colors mt-1"
          >
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
}
