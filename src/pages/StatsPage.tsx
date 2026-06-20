import React from 'react';
import { BarChart2, TrendingUp, Award, Activity } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { useApp } from '../context/AppContext';
import { getAllTimeStats, getDailyPnlSeries, fmt, fmtFull } from '../utils/calculations';
import clsx from 'clsx';

export function StatsPage() {
  const { trades } = useApp();
  const stats = getAllTimeStats(trades);
  const dailySeries = getDailyPnlSeries(trades, 60);

  const cumData = dailySeries.filter(d => d.pnl !== 0 || d.cumulative !== 0);

  if (trades.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8">
        <BarChart2 size={48} className="text-gray-700" />
        <h2 className="text-xl font-bold text-gray-400">No trades yet</h2>
        <p className="text-gray-600 text-center text-sm">Add trades from the calendar to see your statistics</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Statistics</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon={<TrendingUp size={18} />} label="Total P&L" value={fmtFull(stats.totalPnl)} positive={stats.totalPnl >= 0} color="blue" />
        <StatCard icon={<Award size={18} />} label="Win Rate" value={`${stats.winRate.toFixed(1)}%`} positive={stats.winRate >= 50} color="green" />
        <StatCard icon={<Activity size={18} />} label="Total Trades" value={stats.totalTrades.toString()} neutral color="purple" />
        <StatCard icon={<BarChart2 size={18} />} label="Profit Factor" value={stats.profitFactor > 0 ? stats.profitFactor.toFixed(2) : '—'} positive={stats.profitFactor >= 1} color="yellow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <StatCard icon={<TrendingUp size={18} />} label="Avg Winner" value={fmtFull(stats.avgWin)} positive color="green" />
        <StatCard icon={<TrendingUp size={18} />} label="Avg Loser" value={fmtFull(stats.avgLoss)} positive={false} color="red" />
      </div>

      {/* Cumulative P&L chart */}
      {cumData.length > 1 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Cumulative P&L (60 days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={cumData}>
              <defs>
                <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} tickFormatter={v => fmt(v)} width={60} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                formatter={(v: number) => [fmtFull(v), 'Cumulative P&L']}
              />
              <ReferenceLine y={0} stroke="#374151" />
              <Area type="monotone" dataKey="cumulative" stroke="#3B82F6" fill="url(#pnlGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Daily P&L bar chart */}
      {cumData.length > 1 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Daily P&L</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={cumData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} tickFormatter={v => fmt(v)} width={60} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                formatter={(v: number) => [fmtFull(v), 'P&L']}
              />
              <ReferenceLine y={0} stroke="#374151" />
              <Bar dataKey="pnl" radius={[4, 4, 0, 0]}
                fill="#22C55E"
                // Color each bar individually
                label={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon, label, value, positive, neutral, color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  positive?: boolean;
  neutral?: boolean;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-400 bg-blue-500/10',
    green: 'text-green-400 bg-green-500/10',
    red: 'text-red-400 bg-red-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
    yellow: 'text-yellow-400 bg-yellow-500/10',
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center mb-2', colorMap[color])}>
        {icon}
      </div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={clsx(
        'text-lg font-bold',
        neutral ? 'text-white' : positive ? 'text-green-400' : 'text-red-400'
      )}>
        {value}
      </p>
    </div>
  );
}
