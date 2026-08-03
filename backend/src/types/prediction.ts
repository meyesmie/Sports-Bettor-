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

export interface PredictionData {
  id: string;
  matchId: string;
  type: PredictionType;
  prediction: string; // e.g., "1X", "Over 2.5"
  odds: number;
  confidence: number; // 0-100
  isPremium: boolean;
  analysis?: string;
  notes?: string;
}

export interface CreatePredictionInput {
  type: PredictionType;
  prediction: string;
  odds: number;
  confidence: number;
  isPremium?: boolean;
  analysis?: string;
}
