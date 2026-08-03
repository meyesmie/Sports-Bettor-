export const PAYMENT_METHODS = {
  PAYPAL: 'paypal',
  SKRILL: 'skrill',
  PAYSTACK: 'paystack',
} as const;

export const SUBSCRIPTION_PLANS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const;

export const PREDICTION_TYPES = [
  'win',
  'draw',
  'away',
  'double_chance',
  'over1.5',
  'over2.5',
  'over3.5',
  'btts',
  'correct_score',
] as const;

export const PREMIUM_PICK_TYPES = [
  'daily_combo',
  'weekend_combo',
  'accumulator',
  'banker',
  'correct_score',
  'special_combo',
  'system_bet',
] as const;

export const RISK_LEVELS = ['low', 'medium', 'high'] as const;
