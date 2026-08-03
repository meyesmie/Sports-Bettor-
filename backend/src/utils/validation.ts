import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().optional(),
});

export const matchSchema = z.object({
  countryId: z.string().uuid(),
  leagueId: z.string().uuid(),
  homeTeamId: z.string().uuid(),
  awayTeamId: z.string().uuid(),
  matchDate: z.string().datetime(),
  kickoffTime: z.string(),
  predictions: z.array(
    z.object({
      type: z.string(),
      prediction: z.string(),
      odds: z.number().positive(),
      confidence: z.number().int().min(0).max(100),
      isPremium: z.boolean().default(false),
      analysis: z.string().optional(),
    })
  ).optional(),
});
