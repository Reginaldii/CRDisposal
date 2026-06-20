import React from 'react';
import { X, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useApp } from '../../context/AppContext';
import { getDayStats, fmtFull } from '../../utils/calculations';
import { CATEGORY_COLORS, IMPACT_COLORS } from '../../data/economicEvents';
import clsx from 'clsx';

export function DayModal() {
  const { trades, deleteTrade, selectedDate, setModalOpen, getEventsForDate } = useApp();

  if (!selectedDate) return null;

  const stats = getDayStats(trades, selectedDate);
  const events = getEventsForDate(selectedDate);
  const dateLabel = format(parseISO(selectedDate), 'EEEE, MMMM d, yyyy');

  const handleAddTrade = () => setModalOpen('addTrade');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(null)}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md mx-4 shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
          <div>
            <h2 className="text-white font-bold">{dateLabel}</h2>
            {stats.tradeCount > 0 && (
              <p className={clsx('text-lg font-bold', stats.totalPnl >= 0 ? 'text-green-400' : 'text-red-400')}>
                {fmtFull(stats.totalPnl)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddTrade}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={14} /> Add Trade
            </button>
            <button onClick={() => setModalOpen(null)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* Economic events */}
          {events.length > 0 && (
            <div className="p-4 border-b border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Economic Events</p>
              <div className="flex flex-col gap-2">
                {events.map(ev => (
                  <div key={ev.id} className="flex items-start gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: CATEGORY_COLORS[ev.category] }} />
                    <div>
                      <span className="text-gray-200">{ev.title}</span>
                      {ev.time && <span className="text-gray-500 ml-2 text-xs">{ev.time}</span>}
                      <span
                        className="ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${IMPACT_COLORS[ev.impact]}20`,
                          color: IMPACT_COLORS[ev.impact]
                        }}
                      >
                        {ev.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trades */}
          <div className="p-4">
            {stats.tradeCount === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-3">No trades logged for this day.</p>
                <button
                  onClick={handleAddTrade}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Add First Trade
                </button>
              </div>
            ) : (
              <>
                {/* Day summary */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Trades', value: stats.tradeCount.toString() },
                    { label: 'Win Rate', value: `${stats.winRate.toFixed(0)}%` },
                    { label: 'W/L', value: `${stats.winners}/${stats.losers}` },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-800 rounded-lg p-2 text-center">
                      <p className="text-white font-bold text-sm">{item.value}</p>
                      <p className="text-gray-500 text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Individual trades */}
                <div className="flex flex-col gap-2">
                  {stats.trades.map(trade => (
                    <div key={trade.id} className="flex items-start gap-3 bg-gray-800 rounded-xl p-3">
                      <div className={clsx(
                        'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                        trade.pnl >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                      )}>
                        {trade.pnl >= 0
                          ? <TrendingUp size={14} className="text-green-400" />
                          : <TrendingDown size={14} className="text-red-400" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-white font-semibold text-sm">{trade.symbol}</span>
                            <span className={clsx(
                              'ml-2 text-xs px-1.5 py-0.5 rounded font-medium capitalize',
                              trade.side === 'long' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            )}>
                              {trade.side}
                            </span>
                          </div>
                          <span className={clsx(
                            'font-bold text-sm',
                            trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                          )}>
                            {fmtFull(trade.pnl)}
                          </span>
                        </div>
                        {trade.quantity && (
                          <p className="text-xs text-gray-500 mt-0.5">{trade.quantity} units</p>
                        )}
                        {trade.notes && (
                          <p className="text-xs text-gray-400 mt-1 truncate">{trade.notes}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteTrade(trade.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
