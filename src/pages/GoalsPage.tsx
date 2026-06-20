import React from 'react';
import { Plus, Target, TrendingUp, Calendar, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { GoalCard } from '../components/goals/GoalCard';
import { getGoalProgress } from '../utils/calculations';
import { GoalType } from '../types';

const TYPE_ORDER: GoalType[] = ['daily', 'weekly', 'monthly', 'yearly', 'longterm'];
const TYPE_ICONS: Record<GoalType, React.ReactNode> = {
  daily: <Zap size={14} />,
  weekly: <Calendar size={14} />,
  monthly: <TrendingUp size={14} />,
  yearly: <Target size={14} />,
  longterm: <Target size={14} />,
};
const TYPE_LABELS: Record<GoalType, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
  longterm: 'Long-term',
};

export function GoalsPage() {
  const { goals, trades, setModalOpen } = useApp();

  const progressList = goals
    .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
    .map(g => getGoalProgress(trades, g));

  // Group by type
  const grouped = TYPE_ORDER.reduce((acc, type) => {
    acc[type] = progressList.filter(p => p.goal.type === type);
    return acc;
  }, {} as Record<GoalType, typeof progressList>);

  // Overall projection (using monthly goal if exists)
  const monthlyGoal = goals.find(g => g.type === 'monthly');
  const longtermGoal = goals.find(g => g.type === 'longterm');

  const ltProgress = longtermGoal ? getGoalProgress(trades, longtermGoal) : null;

  return (
    <div className="flex flex-1 min-h-0 gap-4 p-4 overflow-y-auto">
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Goals & Projections</h1>
            <p className="text-gray-500 text-sm mt-1">Track your trading targets and project completion</p>
          </div>
          <button
            onClick={() => setModalOpen('addGoal')}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors font-medium"
          >
            <Plus size={16} /> New Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-16">
            <Target size={48} className="text-gray-700 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-400 mb-2">No goals yet</h2>
            <p className="text-gray-600 text-sm mb-4">Set daily, weekly, monthly, and long-term targets to track your progress</p>
            <button
              onClick={() => setModalOpen('addGoal')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition-colors"
            >
              Create First Goal
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Long-term projection banner */}
            {ltProgress && ltProgress.projectedDate && ltProgress.daysToGoal !== null && ltProgress.daysToGoal > 0 && (
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h2 className="text-white font-bold">{ltProgress.goal.label}</h2>
                    <p className="text-gray-400 text-sm">${ltProgress.goal.target.toLocaleString()} target</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Progress</p>
                    <p className="text-xl font-bold text-white">{ltProgress.pct.toFixed(1)}%</p>
                    <p className="text-xs text-gray-500">${ltProgress.current.toLocaleString()} earned</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Avg Daily Rate</p>
                    <p className="text-xl font-bold text-green-400">+${ltProgress.avgRate.toFixed(0)}</p>
                    <p className="text-xs text-gray-500">per trading day</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Projected Done</p>
                    <p className="text-xl font-bold text-blue-400">
                      {ltProgress.daysToGoal <= 365
                        ? format(ltProgress.projectedDate, 'MMM d, yyyy')
                        : `${Math.ceil(ltProgress.daysToGoal / 365).toFixed(0)} years`
                      }
                    </p>
                    <p className="text-xs text-gray-500">{ltProgress.daysToGoal} trading days</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(ltProgress.pct, 100)}%`, backgroundColor: ltProgress.goal.color }}
                  />
                </div>
              </div>
            )}

            {/* Goals by type */}
            {TYPE_ORDER.filter(type => grouped[type].length > 0).map(type => (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-500">{TYPE_ICONS[type]}</span>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{TYPE_LABELS[type]} Goals</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {grouped[type].map(p => <GoalCard key={p.goal.id} progress={p} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
