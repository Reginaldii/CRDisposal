export interface Trade {
  id: string;
  date: string; // 'YYYY-MM-DD'
  symbol: string;
  side: 'long' | 'short';
  pnl: number;
  quantity?: number;
  notes?: string;
  createdAt: string;
}

export type GoalType = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'longterm';

export interface Goal {
  id: string;
  type: GoalType;
  label: string;
  target: number;
  startDate: string;
  color: string;
  description?: string;
}

export type ImpactLevel = 'high' | 'medium' | 'low';
export type EventCategory = 'fed' | 'employment' | 'inflation' | 'gdp' | 'earnings' | 'other';

export interface EconomicEvent {
  id: string;
  date: string; // 'YYYY-MM-DD'
  title: string;
  shortTitle: string;
  impact: ImpactLevel;
  category: EventCategory;
  time?: string;
  description?: string;
  forecast?: string;
  previous?: string;
  isCustom?: boolean;
}

export interface DayStats {
  date: string;
  trades: Trade[];
  totalPnl: number;
  winRate: number;
  tradeCount: number;
  winners: number;
  losers: number;
}

export interface MonthStats {
  totalPnl: number;
  tradingDays: number;
  totalTrades: number;
  winningDays: number;
  losingDays: number;
  winRate: number;
  avgDailyPnl: number;
  bestDay: number;
  worstDay: number;
  currentStreak: number;
}

export interface GoalProgress {
  goal: Goal;
  current: number;
  pct: number;
  daysToGoal: number | null;
  projectedDate: Date | null;
  avgRate: number;
}

export type AppView = 'calendar' | 'goals' | 'stats';
