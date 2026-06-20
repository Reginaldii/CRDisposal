import React from 'react';
import { format, isToday, parseISO } from 'date-fns';
import clsx from 'clsx';
import { EconomicEvent } from '../../types';
import { getDayStats, fmt } from '../../utils/calculations';
import { useApp } from '../../context/AppContext';
import { CATEGORY_COLORS } from '../../data/economicEvents';

interface Props {
  date: Date;
  isCurrentMonth: boolean;
  events: EconomicEvent[];
  dailyGoal?: number;
}

export function DayCell({ date, isCurrentMonth, events, dailyGoal }: Props) {
  const { trades, setSelectedDate, setModalOpen } = useApp();
  const dateStr = format(date, 'yyyy-MM-dd');
  const stats = getDayStats(trades, dateStr);
  const today = isToday(date);
  const hasTrades = stats.tradeCount > 0;
  const isProfit = stats.totalPnl > 0;
  const isLoss = stats.totalPnl < 0;

  // Determine background intensity based on P&L vs daily goal
  const bgColor = (() => {
    if (!hasTrades) return '';
    if (isProfit) {
      const intensity = dailyGoal ? Math.min(stats.totalPnl / dailyGoal, 1) : 0.5;
      if (intensity >= 0.8) return 'bg-green-500/25 border-green-500/40';
      if (intensity >= 0.5) return 'bg-green-500/18 border-green-500/30';
      return 'bg-green-500/12 border-green-500/20';
    }
    if (isLoss) {
      const intensity = dailyGoal ? Math.min(Math.abs(stats.totalPnl) / dailyGoal, 1) : 0.5;
      if (intensity >= 0.8) return 'bg-red-500/25 border-red-500/40';
      if (intensity >= 0.5) return 'bg-red-500/18 border-red-500/30';
      return 'bg-red-500/12 border-red-500/20';
    }
    return 'bg-yellow-500/12 border-yellow-500/20';
  })();

  const handleClick = () => {
    setSelectedDate(dateStr);
    setModalOpen('dayDetail');
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(dateStr);
    setModalOpen('addTrade');
  };

  // Sort events: high impact first
  const sortedEvents = [...events].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.impact] - order[b.impact];
  });

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'relative min-h-[90px] p-1.5 border rounded-lg cursor-pointer transition-all duration-150 group',
        'border-gray-800 bg-gray-900/50',
        bgColor,
        today && 'ring-2 ring-blue-500 ring-offset-1 ring-offset-gray-950',
        !isCurrentMonth && 'opacity-30',
        'hover:border-gray-600 hover:bg-gray-800/60',
      )}
    >
      {/* Date number */}
      <div className="flex justify-between items-start mb-1">
        <span className={clsx(
          'text-xs font-semibold',
          today ? 'bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]' : 'text-gray-400'
        )}>
          {format(date, 'd')}
        </span>
        {/* Add button on hover */}
        <button
          onClick={handleAddClick}
          className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white text-xs leading-none w-4 h-4 flex items-center justify-center hover:bg-gray-700 rounded transition-all"
          title="Add trade"
        >
          +
        </button>
      </div>

      {/* P&L */}
      {hasTrades && (
        <div className="flex flex-col gap-0.5">
          <span className={clsx(
            'text-sm font-bold leading-tight',
            isProfit ? 'text-green-400' : isLoss ? 'text-red-400' : 'text-yellow-400'
          )}>
            {fmt(stats.totalPnl)}
          </span>
          <span className="text-[10px] text-gray-500">
            {stats.tradeCount} trade{stats.tradeCount !== 1 ? 's' : ''}
          </span>
          {stats.tradeCount > 1 && (
            <span className={clsx(
              'text-[10px] font-medium',
              stats.winRate >= 50 ? 'text-green-500' : 'text-red-500'
            )}>
              {stats.winRate.toFixed(0)}%
            </span>
          )}
        </div>
      )}

      {/* Economic event dots */}
      {sortedEvents.length > 0 && (
        <div className="absolute bottom-1 left-1 flex gap-0.5 flex-wrap max-w-[80%]">
          {sortedEvents.slice(0, 4).map(ev => (
            <span
              key={ev.id}
              title={`${ev.time ? ev.time + ' ' : ''}${ev.title}`}
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[ev.category] }}
            />
          ))}
          {sortedEvents.length > 4 && (
            <span className="text-[8px] text-gray-500">+{sortedEvents.length - 4}</span>
          )}
        </div>
      )}
    </div>
  );
}
