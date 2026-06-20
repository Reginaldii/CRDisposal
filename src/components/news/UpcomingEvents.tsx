import React, { useState } from 'react';
import { Plus, Trash2, Newspaper } from 'lucide-react';
import { format, parseISO, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { useApp } from '../../context/AppContext';
import { ECONOMIC_EVENTS_2026, CATEGORY_COLORS, IMPACT_COLORS } from '../../data/economicEvents';
import { EconomicEvent } from '../../types';
import clsx from 'clsx';

function dateLabel(dateStr: string): string {
  const d = parseISO(dateStr);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  const diff = differenceInDays(d, new Date());
  if (diff < 7) return format(d, 'EEEE');
  return format(d, 'MMM d');
}

export function UpcomingEvents() {
  const { customEvents, deleteCustomEvent, setModalOpen } = useApp();
  const [showAll, setShowAll] = useState(false);

  const today = format(new Date(), 'yyyy-MM-dd');
  const allEvents = [...ECONOMIC_EVENTS_2026, ...customEvents]
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const visible = showAll ? allEvents : allEvents.slice(0, 8);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Newspaper size={14} className="text-gray-400" />
          <h3 className="text-sm font-semibold text-white">Upcoming Events</h3>
        </div>
        <button
          onClick={() => setModalOpen('addEvent')}
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
        >
          <Plus size={12} /> Add
        </button>
      </div>

      {allEvents.length === 0 ? (
        <p className="text-gray-600 text-xs text-center py-4">No upcoming events</p>
      ) : (
        <div className="flex flex-col gap-1.5 overflow-y-auto flex-1">
          {visible.map(ev => (
            <div key={ev.id} className="flex items-start gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-800/50 group transition-colors">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[ev.category] }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-200 truncate">{ev.shortTitle}</span>
                  <span
                    className="text-[9px] font-bold px-1 rounded flex-shrink-0"
                    style={{
                      color: IMPACT_COLORS[ev.impact],
                      backgroundColor: `${IMPACT_COLORS[ev.impact]}15`,
                    }}
                  >
                    {ev.impact.toUpperCase()[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-gray-500">{dateLabel(ev.date)}</span>
                  {ev.time && <span className="text-[10px] text-gray-600">{ev.time}</span>}
                </div>
              </div>
              {ev.isCustom && (
                <button
                  onClick={() => deleteCustomEvent(ev.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"
                >
                  <Trash2 size={11} />
                </button>
              )}
            </div>
          ))}

          {allEvents.length > 8 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="text-xs text-gray-500 hover:text-gray-300 text-center py-1.5 transition-colors"
            >
              +{allEvents.length - 8} more events
            </button>
          )}
        </div>
      )}
    </div>
  );
}
