// frontend/src/types/index.ts

// =============================================================================
// Base Entities (from Prisma models)
// =============================================================================

export interface User {
  id: string;
  email: string;
  fullName: string | null;
  emailVerified: boolean;
  subscribed: boolean;
  subscriptionExp: string | null; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string | null;
}

export interface League {
  id: string;
  name: string;
  countryId: string;
  country?: Country;
  logo: string | null;
}

export interface Team {
  id: string;
  name: string;
  logo: string | null;
  countryId: string | null;
  country?: Country | null;
}

export interface Match {
  id: string;
  countryId: string;
  country?: Country;
  leagueId: string;
  league?: League;
  homeTeamId: string;
  homeTeam: Team;
  awayTeamId: string;
  awayTeam: Team;
  matchDate: string; // ISO
  kickoffTime: string;
  status: 'scheduled' | 'live' | 'finished';
  featured: boolean;
  createdAt: string;
  predictions?: Prediction[];
}

export type PredictionType =
  | 'win'
  | 'draw'
  | 'away'
  | 'double_chance'
  | 'over1.5'
  | 'over2.5'
  | 'over3.5'
  | 'btts'
  | 'correct_score';

export interface Prediction {
  id: string;
  matchId: string;
  match?: Match;
  type: PredictionType;
  prediction: string;
  odds: number;
  confidence: number; // 0-100
  isPremium: boolean;
  analysis: string | null;
  notes: string | null;
  createdAt: string;
}

export interface MatchDetail extends Match {
  country: Country;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  predictions: Prediction[];
}

export type PremiumPickType =
  | 'daily_combo'
  | 'weekend_combo'
  | 'accumulator'
  | 'banker'
  | 'correct_score'
  | 'special_combo'
  | 'system_bet';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface PremiumPick {
  id: string;
  title: string;
  type: PremiumPickType;
  selections: any; // JSON – array of match/prediction objects
  description: string | null;
  stakeAdvice: string | null;
  riskLevel: RiskLevel;
  odds: number;
  instructions: string | null;
  active: boolean;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  active: boolean;
  paymentId: string | null;
  createdAt: string;
}

export type PaymentMethod = 'paypal' | 'skrill' | 'paystack';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string | null;
  message: string;
  type: 'subscription' | 'premium_pick' | 'admin';
  read: boolean;
  createdAt: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
}

export interface AuditLog {
  id: string;
  adminId: string | null;
  action: string;
  details: string | null;
  ip: string | null;
  createdAt: string;
}

// =============================================================================
// API Response Wrappers
// =============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// =============================================================================
// Dashboard / Aggregated Stats
// =============================================================================

export interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
  todayMatches: number;
  activeSubscriptions: number;
  revenue: number;
  upcomingMatches: number;
}

export interface RevenueChartDataPoint {
  date: string;
  amount: number;
}

// =============================================================================
// Auth forms and contexts
// =============================================================================

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName?: string) => Promise<void>;
  logout: () => Promise<void>;
}

// =============================================================================
// Match form (admin)
// =============================================================================

export interface CreateMatchInput {
  countryId: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: string; // ISO string
  kickoffTime: string;
  predictions?: CreatePredictionInput[];
}

export interface CreatePredictionInput {
  type: PredictionType;
  prediction: string;
  odds: number;
  confidence: number;
  isPremium?: boolean;
  analysis?: string;
}

// =============================================================================
// Filter parameters
// =============================================================================

export interface PredictionFilters {
  page?: number;
  limit?: number;
  filter?: 'today' | 'tomorrow' | 'premium' | 'date';
  date?: string;
  league?: string;
  country?: string;
  type?: string;
  search?: string;
  isPremium?: boolean;
}
