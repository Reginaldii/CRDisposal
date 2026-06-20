import { EconomicEvent } from '../types';

export const ECONOMIC_EVENTS_2026: EconomicEvent[] = [
  // ── FOMC Meetings ──────────────────────────────────────────
  { id: 'fomc-jan', date: '2026-01-29', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },
  { id: 'fomc-mar', date: '2026-03-19', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },
  { id: 'fomc-apr', date: '2026-04-30', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },
  { id: 'fomc-jun', date: '2026-06-11', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },
  { id: 'fomc-jul', date: '2026-07-30', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },
  { id: 'fomc-sep', date: '2026-09-17', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },
  { id: 'fomc-oct', date: '2026-10-29', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },
  { id: 'fomc-dec', date: '2026-12-10', title: 'FOMC Rate Decision', shortTitle: 'FOMC', impact: 'high', category: 'fed', time: '14:00', description: 'Federal Reserve interest rate decision and statement' },

  // ── Fed Chair Speeches / Testimonies ───────────────────────
  { id: 'fed-speech-jan', date: '2026-01-15', title: "Fed Chair Testimony", shortTitle: 'Fed Speech', impact: 'high', category: 'fed', time: '10:00' },
  { id: 'fed-speech-mar', date: '2026-03-05', title: "Fed Chair Testimony", shortTitle: 'Fed Speech', impact: 'high', category: 'fed', time: '10:00' },
  { id: 'fed-speech-jun', date: '2026-06-24', title: "Fed Chair Semiannual Testimony", shortTitle: 'Fed Testimony', impact: 'high', category: 'fed', time: '10:00' },
  { id: 'fed-speech-nov', date: '2026-11-18', title: "Fed Chair Semiannual Testimony", shortTitle: 'Fed Testimony', impact: 'high', category: 'fed', time: '10:00' },

  // ── Non-Farm Payrolls (first Friday of each month) ─────────
  { id: 'nfp-jan', date: '2026-01-09', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-feb', date: '2026-02-06', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-mar', date: '2026-03-06', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-apr', date: '2026-04-03', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-may', date: '2026-05-08', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-jun', date: '2026-06-05', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-jul', date: '2026-07-10', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-aug', date: '2026-08-07', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-sep', date: '2026-09-04', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-oct', date: '2026-10-02', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-nov', date: '2026-11-06', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },
  { id: 'nfp-dec', date: '2026-12-04', title: 'Non-Farm Payrolls', shortTitle: 'NFP', impact: 'high', category: 'employment', time: '08:30', description: 'Monthly jobs report' },

  // ── CPI (Consumer Price Index) ─────────────────────────────
  { id: 'cpi-jan', date: '2026-01-14', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30', description: 'Consumer Price Index – key inflation gauge' },
  { id: 'cpi-feb', date: '2026-02-11', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-mar', date: '2026-03-11', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-apr', date: '2026-04-10', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-may', date: '2026-05-13', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-jun', date: '2026-06-10', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-jul', date: '2026-07-14', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-aug', date: '2026-08-12', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-sep', date: '2026-09-10', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-oct', date: '2026-10-14', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-nov', date: '2026-11-12', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'cpi-dec', date: '2026-12-10', title: 'CPI Report', shortTitle: 'CPI', impact: 'high', category: 'inflation', time: '08:30' },

  // ── PPI (Producer Price Index) ─────────────────────────────
  { id: 'ppi-jan', date: '2026-01-15', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-feb', date: '2026-02-12', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-mar', date: '2026-03-12', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-apr', date: '2026-04-11', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-may', date: '2026-05-14', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-jun', date: '2026-06-11', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-jul', date: '2026-07-15', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-aug', date: '2026-08-13', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-sep', date: '2026-09-11', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-oct', date: '2026-10-15', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-nov', date: '2026-11-13', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },
  { id: 'ppi-dec', date: '2026-12-11', title: 'PPI Report', shortTitle: 'PPI', impact: 'medium', category: 'inflation', time: '08:30' },

  // ── PCE (Fed's preferred inflation measure) ────────────────
  { id: 'pce-jan', date: '2026-01-30', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30', description: "Fed's preferred inflation measure" },
  { id: 'pce-feb', date: '2026-02-27', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-mar', date: '2026-03-27', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-apr', date: '2026-04-24', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-may', date: '2026-05-29', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-jun', date: '2026-06-26', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-jul', date: '2026-07-31', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-aug', date: '2026-08-28', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-sep', date: '2026-09-25', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-oct', date: '2026-10-30', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-nov', date: '2026-11-25', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },
  { id: 'pce-dec', date: '2026-12-18', title: 'Core PCE Price Index', shortTitle: 'PCE', impact: 'high', category: 'inflation', time: '08:30' },

  // ── GDP ────────────────────────────────────────────────────
  { id: 'gdp-q4-advance', date: '2026-01-30', title: 'GDP Q4 2025 (Advance)', shortTitle: 'GDP', impact: 'high', category: 'gdp', time: '08:30' },
  { id: 'gdp-q4-second', date: '2026-02-26', title: 'GDP Q4 2025 (Second)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },
  { id: 'gdp-q4-final', date: '2026-03-26', title: 'GDP Q4 2025 (Final)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },
  { id: 'gdp-q1-advance', date: '2026-04-30', title: 'GDP Q1 2026 (Advance)', shortTitle: 'GDP', impact: 'high', category: 'gdp', time: '08:30' },
  { id: 'gdp-q1-second', date: '2026-05-28', title: 'GDP Q1 2026 (Second)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },
  { id: 'gdp-q1-final', date: '2026-06-25', title: 'GDP Q1 2026 (Final)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },
  { id: 'gdp-q2-advance', date: '2026-07-30', title: 'GDP Q2 2026 (Advance)', shortTitle: 'GDP', impact: 'high', category: 'gdp', time: '08:30' },
  { id: 'gdp-q2-second', date: '2026-08-27', title: 'GDP Q2 2026 (Second)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },
  { id: 'gdp-q2-final', date: '2026-09-24', title: 'GDP Q2 2026 (Final)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },
  { id: 'gdp-q3-advance', date: '2026-10-29', title: 'GDP Q3 2026 (Advance)', shortTitle: 'GDP', impact: 'high', category: 'gdp', time: '08:30' },
  { id: 'gdp-q3-second', date: '2026-11-24', title: 'GDP Q3 2026 (Second)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },
  { id: 'gdp-q3-final', date: '2026-12-22', title: 'GDP Q3 2026 (Final)', shortTitle: 'GDP', impact: 'medium', category: 'gdp', time: '08:30' },

  // ── Retail Sales ────────────────────────────────────────────
  { id: 'retail-jan', date: '2026-01-15', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-feb', date: '2026-02-13', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-mar', date: '2026-03-17', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-apr', date: '2026-04-15', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-may', date: '2026-05-15', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-jun', date: '2026-06-16', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-jul', date: '2026-07-16', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-aug', date: '2026-08-14', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-sep', date: '2026-09-17', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-oct', date: '2026-10-15', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-nov', date: '2026-11-17', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },
  { id: 'retail-dec', date: '2026-12-16', title: 'Retail Sales', shortTitle: 'Retail', impact: 'medium', category: 'other', time: '08:30' },

  // ── Unemployment Claims (Thursday, weekly highlight months) ─
  { id: 'claims-jun-4', date: '2026-06-04', title: 'Initial Jobless Claims', shortTitle: 'Claims', impact: 'medium', category: 'employment', time: '08:30' },
  { id: 'claims-jun-11', date: '2026-06-11', title: 'Initial Jobless Claims', shortTitle: 'Claims', impact: 'medium', category: 'employment', time: '08:30' },
  { id: 'claims-jun-18', date: '2026-06-18', title: 'Initial Jobless Claims', shortTitle: 'Claims', impact: 'medium', category: 'employment', time: '08:30' },
  { id: 'claims-jun-25', date: '2026-06-25', title: 'Initial Jobless Claims', shortTitle: 'Claims', impact: 'medium', category: 'employment', time: '08:30' },

  // ── Jackson Hole Symposium ────────────────────────────────
  { id: 'jackson-hole', date: '2026-08-27', title: 'Jackson Hole Symposium', shortTitle: 'Jackson Hole', impact: 'high', category: 'fed', time: '09:00', description: 'Annual Fed Symposium – key policy signals' },

  // ── Consumer Confidence ───────────────────────────────────
  { id: 'conf-jan', date: '2026-01-27', title: 'Consumer Confidence', shortTitle: 'Conf.', impact: 'low', category: 'other', time: '10:00' },
  { id: 'conf-feb', date: '2026-02-24', title: 'Consumer Confidence', shortTitle: 'Conf.', impact: 'low', category: 'other', time: '10:00' },
  { id: 'conf-mar', date: '2026-03-31', title: 'Consumer Confidence', shortTitle: 'Conf.', impact: 'low', category: 'other', time: '10:00' },
  { id: 'conf-apr', date: '2026-04-28', title: 'Consumer Confidence', shortTitle: 'Conf.', impact: 'low', category: 'other', time: '10:00' },
  { id: 'conf-may', date: '2026-05-26', title: 'Consumer Confidence', shortTitle: 'Conf.', impact: 'low', category: 'other', time: '10:00' },
  { id: 'conf-jun', date: '2026-06-30', title: 'Consumer Confidence', shortTitle: 'Conf.', impact: 'low', category: 'other', time: '10:00' },
];

export const IMPACT_COLORS: Record<string, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#6B7280',
};

export const CATEGORY_COLORS: Record<string, string> = {
  fed: '#8B5CF6',
  employment: '#3B82F6',
  inflation: '#F59E0B',
  gdp: '#10B981',
  earnings: '#EC4899',
  other: '#6B7280',
};

export const CATEGORY_LABELS: Record<string, string> = {
  fed: 'Fed / Monetary',
  employment: 'Employment',
  inflation: 'Inflation',
  gdp: 'GDP',
  earnings: 'Earnings',
  other: 'Other',
};
