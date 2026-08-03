// frontend/src/lib/validation.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export const matchSchema = z.object({
  countryId: z.string().min(1, 'Country is required'),
  leagueId: z.string().min(1, 'League is required'),
  homeTeamId: z.string().min(1, 'Home team is required'),
  awayTeamId: z.string().min(1, 'Away team is required'),
  matchDate: z.string().min(1, 'Date is required'),
  kickoffTime: z.string().min(1, 'Kickoff time is required'),
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
