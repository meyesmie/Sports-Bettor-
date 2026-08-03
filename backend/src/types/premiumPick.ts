export type PremiumPickType =
  | 'daily_combo'
  | 'weekend_combo'
  | 'accumulator'
  | 'banker'
  | 'correct_score'
  | 'special_combo'
  | 'system_bet';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface PremiumPickData {
  id: string;
  title: string;
  type: PremiumPickType;
  selections: any; // JSON field – array of match/prediction objects
  description?: string;
  stakeAdvice?: string;
  riskLevel: RiskLevel;
  odds: number;
  instructions?: string;
  active: boolean;
  createdAt: Date;
}
