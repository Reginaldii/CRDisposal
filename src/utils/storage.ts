import { Trade, Goal, EconomicEvent } from '../types';

const KEYS = {
  trades: 'tradedash_trades',
  goals: 'tradedash_goals',
  customEvents: 'tradedash_custom_events',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadTrades(): Trade[] {
  return load<Trade[]>(KEYS.trades, []);
}

export function saveTrades(trades: Trade[]): void {
  save(KEYS.trades, trades);
}

export function loadGoals(): Goal[] {
  return load<Goal[]>(KEYS.goals, []);
}

export function saveGoals(goals: Goal[]): void {
  save(KEYS.goals, goals);
}

export function loadCustomEvents(): EconomicEvent[] {
  return load<EconomicEvent[]>(KEYS.customEvents, []);
}

export function saveCustomEvents(events: EconomicEvent[]): void {
  save(KEYS.customEvents, events);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
