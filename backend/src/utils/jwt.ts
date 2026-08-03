import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface TokenPayload {
  userId?: string;
  adminId?: string;
}

export const generateAccessToken = (payload: TokenPayload, expiresIn = '15m') => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
};

export const generateRefreshToken = (payload: TokenPayload, expiresIn = '7d') => {
  return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwtSecret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwtRefreshSecret) as TokenPayload;
};
