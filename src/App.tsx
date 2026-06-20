import React from 'react';
import { CalendarDays, Target, BarChart2, Newspaper, Plus } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { CalendarPage } from './pages/CalendarPage';
import { GoalsPage } from './pages/GoalsPage';
import { StatsPage } from './pages/StatsPage';
import { AddTradeModal } from './components/modals/AddTradeModal';
import { DayModal } from './components/modals/DayModal';
import { AddGoalModal } from './components/modals/AddGoalModal';
import { AddEventModal } from './components/modals/AddEventModal';
import { AppView } from './types';
import clsx from 'clsx';

const NAV_ITEMS: { view: AppView; icon: React.ReactNode; label: string }[] = [
  { view: 'calendar', icon: <CalendarDays size={20} />, label: 'Calendar' },
  { view: 'goals', icon: <Target size={20} />, label: 'Goals' },
  { view: 'stats', icon: <BarChart2 size={20} />, label: 'Stats' },
];

function Shell() {
  const { view, setView, modalOpen } = useApp();

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 flex-shrink-0 flex flex-col items-center py-4 bg-gray-950 border-r border-gray-800 gap-1">
        {/* Logo */}
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center mb-4 flex-shrink-0">
          <span className="text-white font-bold text-sm">TD</span>
        </div>

        {NAV_ITEMS.map(item => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            title={item.label}
            className={clsx(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
              view === item.view
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-white hover:bg-gray-800'
            )}
          >
            {item.icon}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">TradeDash</span>
            <span className="text-gray-600 text-sm">—</span>
            <span className="text-gray-400 text-sm capitalize">{view}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 bg-gray-800 px-2 py-1 rounded-lg">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {view === 'calendar' && <CalendarPage />}
          {view === 'goals' && <GoalsPage />}
          {view === 'stats' && <StatsPage />}
        </div>
      </main>

      {/* Modals */}
      {modalOpen === 'addTrade' && <AddTradeModal />}
      {modalOpen === 'dayDetail' && <DayModal />}
      {modalOpen === 'addGoal' && <AddGoalModal />}
      {modalOpen === 'addEvent' && <AddEventModal />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
