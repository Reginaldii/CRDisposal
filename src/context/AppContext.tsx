import React, { createContext, useContext, useState, useCallback } from 'react';
import { Trade, Goal, EconomicEvent, AppView } from '../types';
import { loadTrades, saveTrades, loadGoals, saveGoals, loadCustomEvents, saveCustomEvents, generateId } from '../utils/storage';
import { ECONOMIC_EVENTS_2026 } from '../data/economicEvents';
import { format } from 'date-fns';

interface AppContextType {
  // Trades
  trades: Trade[];
  addTrade: (t: Omit<Trade, 'id' | 'createdAt'>) => void;
  updateTrade: (id: string, updates: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;

  // Goals
  goals: Goal[];
  addGoal: (g: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // Economic events
  economicEvents: EconomicEvent[];
  customEvents: EconomicEvent[];
  addCustomEvent: (e: Omit<EconomicEvent, 'id'>) => void;
  deleteCustomEvent: (id: string) => void;
  getEventsForDate: (date: string) => EconomicEvent[];

  // UI State
  view: AppView;
  setView: (v: AppView) => void;
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
  selectedDate: string | null;
  setSelectedDate: (d: string | null) => void;
  modalOpen: 'addTrade' | 'dayDetail' | 'addGoal' | 'addEvent' | null;
  setModalOpen: (m: 'addTrade' | 'dayDetail' | 'addGoal' | 'addEvent' | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>(() => loadTrades());
  const [goals, setGoals] = useState<Goal[]>(() => loadGoals());
  const [customEvents, setCustomEvents] = useState<EconomicEvent[]>(() => loadCustomEvents());
  const [view, setView] = useState<AppView>('calendar');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<AppContextType['modalOpen']>(null);

  const addTrade = useCallback((t: Omit<Trade, 'id' | 'createdAt'>) => {
    const newTrade: Trade = { ...t, id: generateId(), createdAt: new Date().toISOString() };
    setTrades(prev => { const next = [...prev, newTrade]; saveTrades(next); return next; });
  }, []);

  const updateTrade = useCallback((id: string, updates: Partial<Trade>) => {
    setTrades(prev => { const next = prev.map(t => t.id === id ? { ...t, ...updates } : t); saveTrades(next); return next; });
  }, []);

  const deleteTrade = useCallback((id: string) => {
    setTrades(prev => { const next = prev.filter(t => t.id !== id); saveTrades(next); return next; });
  }, []);

  const addGoal = useCallback((g: Omit<Goal, 'id'>) => {
    const newGoal: Goal = { ...g, id: generateId() };
    setGoals(prev => { const next = [...prev, newGoal]; saveGoals(next); return next; });
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<Goal>) => {
    setGoals(prev => { const next = prev.map(g => g.id === id ? { ...g, ...updates } : g); saveGoals(next); return next; });
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => { const next = prev.filter(g => g.id !== id); saveGoals(next); return next; });
  }, []);

  const addCustomEvent = useCallback((e: Omit<EconomicEvent, 'id'>) => {
    const ev: EconomicEvent = { ...e, id: generateId(), isCustom: true };
    setCustomEvents(prev => { const next = [...prev, ev]; saveCustomEvents(next); return next; });
  }, []);

  const deleteCustomEvent = useCallback((id: string) => {
    setCustomEvents(prev => { const next = prev.filter(e => e.id !== id); saveCustomEvents(next); return next; });
  }, []);

  const allEvents = [...ECONOMIC_EVENTS_2026, ...customEvents];

  const getEventsForDate = useCallback((date: string) => {
    return allEvents.filter(e => e.date === date);
  }, [customEvents]);

  return (
    <AppContext.Provider value={{
      trades, addTrade, updateTrade, deleteTrade,
      goals, addGoal, updateGoal, deleteGoal,
      economicEvents: ECONOMIC_EVENTS_2026,
      customEvents, addCustomEvent, deleteCustomEvent, getEventsForDate,
      view, setView,
      currentMonth, setCurrentMonth,
      selectedDate, setSelectedDate,
      modalOpen, setModalOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
