import { Trade, DayStats, MonthStats, Goal, GoalProgress } from '../types';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO, differenceInDays, addDays } from 'date-fns';

export function getDayStats(trades: Trade[], date: string): DayStats {
  const dayTrades = trades.filter(t => t.date === date);
  const totalPnl = dayTrades.reduce((sum, t) => sum + t.pnl, 0);
  const winners = dayTrades.filter(t => t.pnl > 0).length;
  const losers = dayTrades.filter(t => t.pnl < 0).length;
  const winRate = dayTrades.length > 0 ? (winners / dayTrades.length) * 100 : 0;
  return { date, trades: dayTrades, totalPnl, winRate, tradeCount: dayTrades.length, winners, losers };
}

export function getMonthStats(trades: Trade[], year: number, month: number): MonthStats {
  const start = startOfMonth(new Date(year, month, 1));
  const end = endOfMonth(new Date(year, month, 1));
  const monthTrades = trades.filter(t => {
    const d = parseISO(t.date);
    return isWithinInterval(d, { start, end });
  });

  // Group by day
  const dayMap = new Map<string, number>();
  for (const t of monthTrades) {
    dayMap.set(t.date, (dayMap.get(t.date) ?? 0) + t.pnl);
  }

  const dayPnls = Array.from(dayMap.values());
  const tradingDays = dayPnls.length;
  const winningDays = dayPnls.filter(p => p > 0).length;
  const losingDays = dayPnls.filter(p => p < 0).length;
  const totalPnl = monthTrades.reduce((sum, t) => sum + t.pnl, 0);
  const bestDay = dayPnls.length > 0 ? Math.max(...dayPnls) : 0;
  const worstDay = dayPnls.length > 0 ? Math.min(...dayPnls) : 0;

  // Current streak
  const today = new Date();
  let streak = 0;
  let checkDate = new Date(today);
  while (true) {
    const key = format(checkDate, 'yyyy-MM-dd');
    if (!dayMap.has(key)) break;
    const pnl = dayMap.get(key)!;
    if (streak === 0) { streak = pnl > 0 ? 1 : -1; }
    else if ((streak > 0 && pnl > 0) || (streak < 0 && pnl < 0)) {
      streak += streak > 0 ? 1 : -1;
    } else break;
    checkDate = addDays(checkDate, -1);
  }

  return {
    totalPnl,
    tradingDays,
    totalTrades: monthTrades.length,
    winningDays,
    losingDays,
    winRate: tradingDays > 0 ? (winningDays / tradingDays) * 100 : 0,
    avgDailyPnl: tradingDays > 0 ? totalPnl / tradingDays : 0,
    bestDay,
    worstDay,
    currentStreak: streak,
  };
}

export function getGoalProgress(trades: Trade[], goal: Goal): GoalProgress {
  const now = new Date();
  const startDate = parseISO(goal.startDate);
  let current = 0;
  let periodTrades: Trade[] = [];

  if (goal.type === 'daily') {
    const today = format(now, 'yyyy-MM-dd');
    periodTrades = trades.filter(t => t.date === today);
    current = periodTrades.reduce((s, t) => s + t.pnl, 0);
  } else if (goal.type === 'weekly') {
    const wStart = startOfWeek(now, { weekStartsOn: 1 });
    const wEnd = endOfWeek(now, { weekStartsOn: 1 });
    periodTrades = trades.filter(t => isWithinInterval(parseISO(t.date), { start: wStart, end: wEnd }));
    current = periodTrades.reduce((s, t) => s + t.pnl, 0);
  } else if (goal.type === 'monthly') {
    const mStart = startOfMonth(now);
    const mEnd = endOfMonth(now);
    periodTrades = trades.filter(t => isWithinInterval(parseISO(t.date), { start: mStart, end: mEnd }));
    current = periodTrades.reduce((s, t) => s + t.pnl, 0);
  } else if (goal.type === 'yearly') {
    const yStart = new Date(now.getFullYear(), 0, 1);
    const yEnd = new Date(now.getFullYear(), 11, 31);
    periodTrades = trades.filter(t => isWithinInterval(parseISO(t.date), { start: yStart, end: yEnd }));
    current = periodTrades.reduce((s, t) => s + t.pnl, 0);
  } else {
    // longterm: from startDate to now
    periodTrades = trades.filter(t => parseISO(t.date) >= startDate);
    current = periodTrades.reduce((s, t) => s + t.pnl, 0);
  }

  const pct = goal.target > 0 ? Math.min((current / goal.target) * 100, 100) : 0;
  const remaining = goal.target - current;

  // Avg daily P&L from last 14 days of trading
  const twoWeeksAgo = addDays(now, -14);
  const recentTrades = trades.filter(t => parseISO(t.date) >= twoWeeksAgo);
  const recentDayMap = new Map<string, number>();
  for (const t of recentTrades) {
    recentDayMap.set(t.date, (recentDayMap.get(t.date) ?? 0) + t.pnl);
  }
  const recentDays = Array.from(recentDayMap.values()).filter(p => p !== 0);
  const avgRate = recentDays.length > 0 ? recentDays.reduce((s, p) => s + p, 0) / recentDays.length : 0;

  let daysToGoal: number | null = null;
  let projectedDate: Date | null = null;

  if (avgRate > 0 && remaining > 0) {
    daysToGoal = Math.ceil(remaining / avgRate);
    projectedDate = addDays(now, daysToGoal);
  } else if (remaining <= 0) {
    daysToGoal = 0;
    projectedDate = now;
  }

  return { goal, current, pct, daysToGoal, projectedDate, avgRate };
}

export function getAllTimeStats(trades: Trade[]) {
  const totalPnl = trades.reduce((s, t) => s + t.pnl, 0);
  const winners = trades.filter(t => t.pnl > 0).length;
  const losers = trades.filter(t => t.pnl < 0).length;
  const winRate = trades.length > 0 ? (winners / trades.length) * 100 : 0;
  const avgWin = winners > 0 ? trades.filter(t => t.pnl > 0).reduce((s, t) => s + t.pnl, 0) / winners : 0;
  const avgLoss = losers > 0 ? trades.filter(t => t.pnl < 0).reduce((s, t) => s + t.pnl, 0) / losers : 0;
  const profitFactor = avgLoss !== 0 ? Math.abs(avgWin / avgLoss) : 0;

  // Days with trades
  const dayMap = new Map<string, number>();
  for (const t of trades) {
    dayMap.set(t.date, (dayMap.get(t.date) ?? 0) + t.pnl);
  }
  const dayPnls = Array.from(dayMap.values());
  const winningDays = dayPnls.filter(p => p > 0).length;

  return { totalPnl, totalTrades: trades.length, winners, losers, winRate, avgWin, avgLoss, profitFactor, tradingDays: dayMap.size, winningDays };
}

export function getDailyPnlSeries(trades: Trade[], days = 30) {
  const result: { date: string; pnl: number; cumulative: number }[] = [];
  const now = new Date();
  let cumulative = 0;
  for (let i = days - 1; i >= 0; i--) {
    const d = addDays(now, -i);
    const key = format(d, 'yyyy-MM-dd');
    const pnl = trades.filter(t => t.date === key).reduce((s, t) => s + t.pnl, 0);
    cumulative += pnl;
    if (pnl !== 0 || result.length > 0) {
      result.push({ date: format(d, 'MMM d'), pnl, cumulative });
    }
  }
  return result;
}

export function fmt(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : amount > 0 ? '+' : '';
  if (abs >= 1000) {
    return `${sign}$${(abs / 1000).toFixed(1)}K`;
  }
  return `${sign}$${abs.toFixed(0)}`;
}

export function fmtFull(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '+';
  return `${sign}$${abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
