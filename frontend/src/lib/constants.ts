// frontend/src/lib/constants.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const PREDICTION_TYPES = [
  { value: 'win', label: 'Home Win' },
  { value: 'draw', label: 'Draw' },
  { value: 'away', label: 'Away Win' },
  { value: 'double_chance', label: 'Double Chance' },
  { value: 'over1.5', label: 'Over 1.5' },
  { value: 'over2.5', label: 'Over 2.5' },
  { value: 'over3.5', label: 'Over 3.5' },
  { value: 'btts', label: 'BTTS' },
  { value: 'correct_score', label: 'Correct Score' },
];

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

export const SUBSCRIPTION_PLANS = {
  weekly: { price: 1, label: 'Weekly' },
  monthly: { price: 4, label: 'Monthly' },
} as const;

export const PAYMENT_METHODS = ['paypal', 'paystack', 'skrill'] as const;
