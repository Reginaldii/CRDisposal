import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Newspaper } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { useApp } from '../context/AppContext';
import { MonthCalendar } from '../components/calendar/MonthCalendar';
import { getMonthStats, fmt } from '../utils/calculations';
import { UpcomingEvents } from '../components/news/UpcomingEvents';
import { getGoalProgress } from '../utils/calculations';
import clsx from 'clsx';

export function CalendarPage() {
  const { currentMonth, setCurrentMonth, trades, goals, setModalOpen } = useApp();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const stats = getMonthStats(trades, year, month);

  const dailyGoal = goals.find(g => g.type === 'daily');
  const monthlyGoal = goals.find(g => g.type === 'monthly');
  const monthlyProgress = monthlyGoal ? getGoalProgress(trades, monthlyGoal) : null;

  return (
    <div className="flex flex-1 min-h-0 gap-4 p-4">
      {/* Main calendar area */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0">
        {/* Header: month nav + stats */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <h2 className="text-xl font-bold text-white w-40 text-center">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Stats chips */}
          <div className="flex items-center gap-2">
            <StatChip
              label="P&L"
              value={fmt(stats.totalPnl)}
              positive={stats.totalPnl >= 0}
            />
            <StatChip label="Days" value={stats.tradingDays.toString()} neutral />
            <StatChip
              label="Win%"
              value={`${stats.winRate.toFixed(0)}%`}
              positive={stats.winRate >= 50}
            />
            {monthlyProgress && (
              <div className="flex items-center gap-1.5 bg-gray-800 rounded-lg px-3 py-1.5">
                <div className="h-1.5 w-16 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(monthlyProgress.pct, 100)}%`,
                      backgroundColor: monthlyGoal!.color,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-400">{monthlyProgress.pct.toFixed(0)}%</span>
              </div>
            )}
            <button
              onClick={() => setModalOpen('addTrade')}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={14} /> Trade
            </button>
          </div>
        </div>

        {/* Calendar */}
        <MonthCalendar dailyGoal={dailyGoal?.target} />
      </div>

      {/* Right panel */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4 min-h-0">
        {/* Month summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex-shrink-0">
          <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Monthly Stats</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Trades', value: stats.totalTrades.toString() },
              { label: 'Avg/Day', value: fmt(stats.avgDailyPnl) },
              { label: 'Best Day', value: fmt(stats.bestDay) },
              { label: 'Worst Day', value: fmt(stats.worstDay) },
            ].map(item => (
              <div key={item.label} className="bg-gray-800 rounded-lg p-2">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
          {stats.currentStreak !== 0 && (
            <div className={clsx(
              'mt-2 text-xs px-2 py-1 rounded-lg text-center font-medium',
              stats.currentStreak > 0 ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
            )}>
              {Math.abs(stats.currentStreak)}-day {stats.currentStreak > 0 ? 'win' : 'loss'} streak
            </div>
          )}
        </div>

        {/* Upcoming events */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex-1 min-h-0 flex flex-col">
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}

function StatChip({ label, value, positive, neutral }: { label: string; value: string; positive?: boolean; neutral?: boolean }) {
  return (
    <div className="bg-gray-800 rounded-lg px-3 py-1.5 text-center">
      <p className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={clsx(
        'text-sm font-bold',
        neutral ? 'text-white' : positive ? 'text-green-400' : 'text-red-400'
      )}>
        {value}
      </p>
    </div>
  );
}
