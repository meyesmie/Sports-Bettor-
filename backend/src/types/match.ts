export interface MatchData {
  id: string;
  countryId: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: Date;
  kickoffTime: string; // e.g., "20:00"
  status: 'scheduled' | 'live' | 'finished';
  featured: boolean;
  createdAt: Date;
}

export interface CreateMatchInput {
  countryId: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: string; // ISO string
  kickoffTime: string;
  predictions?: CreatePredictionInput[];
}

export interface MatchFilter {
  country?: string;
  league?: string;
  date?: string;
  status?: 'scheduled' | 'live' | 'finished';
  search?: string;
  page?: number;
  limit?: number;
}
