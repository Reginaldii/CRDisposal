import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth } from 'date-fns';
import { useApp } from '../../context/AppContext';
import { DayCell } from './DayCell';
import { Goal } from '../../types';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Props {
  dailyGoal?: number;
}

export function MonthCalendar({ dailyGoal }: Props) {
  const { currentMonth, getEventsForDate } = useApp();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DOW.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-500 py-1.5">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 flex-1" style={{ gridAutoRows: 'minmax(90px, 1fr)' }}>
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          return (
            <DayCell
              key={dateStr}
              date={day}
              isCurrentMonth={isSameMonth(day, currentMonth)}
              events={getEventsForDate(dateStr)}
              dailyGoal={dailyGoal}
            />
          );
        })}
      </div>
    </div>
  );
}
