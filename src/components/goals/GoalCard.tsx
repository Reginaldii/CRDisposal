import React from 'react';
import { Trash2, Target, TrendingUp, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { GoalProgress } from '../../types';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const TYPE_LABELS: Record<string, string> = {
  daily: 'Today',
  weekly: 'This Week',
  monthly: 'This Month',
  yearly: 'This Year',
  longterm: 'Long-term',
};

interface Props {
  progress: GoalProgress;
}

export function GoalCard({ progress }: Props) {
  const { deleteGoal } = useApp();
  const { goal, current, pct, daysToGoal, projectedDate, avgRate } = progress;
  const isComplete = pct >= 100;
  const isNegative = current < 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 relative group">
      {/* Delete button */}
      <button
        onClick={() => deleteGoal(goal.id)}
        className="absolute top-3 right-3 text-gray-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 size={14} />
      </button>

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${goal.color}20` }}>
          <Target size={16} style={{ color: goal.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-sm truncate">{goal.label}</h3>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full flex-shrink-0">
              {TYPE_LABELS[goal.type]}
            </span>
          </div>
          {goal.description && (
            <p className="text-gray-500 text-xs mt-0.5 truncate">{goal.description}</p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span className={clsx('font-bold text-sm', isComplete ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-white')}>
            ${current.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
          <span className="text-gray-500">/ ${goal.target.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.max(0, Math.min(pct, 100))}%`,
              backgroundColor: isComplete ? '#22C55E' : isNegative ? '#EF4444' : goal.color,
            }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span style={{ color: isComplete ? '#22C55E' : goal.color }} className="font-medium">
            {isComplete ? 'Complete!' : `${pct.toFixed(0)}%`}
          </span>
          <span className="text-gray-600">
            ${Math.max(0, goal.target - current).toLocaleString()} left
          </span>
        </div>
      </div>

      {/* Projection */}
      {!isComplete && avgRate > 0 && (
        <div className="border-t border-gray-800 pt-3 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={12} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Avg rate</p>
              <p className={clsx('text-xs font-semibold', avgRate > 0 ? 'text-green-400' : 'text-red-400')}>
                ${avgRate.toFixed(0)}/day
              </p>
            </div>
          </div>
          {daysToGoal !== null && projectedDate && (
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Est. done</p>
                <p className="text-xs font-semibold text-blue-400">
                  {daysToGoal === 0 ? 'Now' : daysToGoal <= 7 ? `${daysToGoal}d` : format(projectedDate, 'MMM d')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {isComplete && (
        <div className="border-t border-gray-800 pt-3">
          <div className="flex items-center gap-2 text-green-400">
            <span className="text-lg">🔥</span>
            <p className="text-sm font-semibold">Goal crushed! +${(current - goal.target).toLocaleString()} over</p>
          </div>
        </div>
      )}
    </div>
  );
}
