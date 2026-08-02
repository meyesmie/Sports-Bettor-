import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword, fullName } });
  // send verification email (mocked)
  res.status(201).json({ message: 'User created', userId: user.id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user.id }, config.jwtRefreshSecret, { expiresIn: '7d' });

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7*24*60*60*1000) },
  });

  res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.json({ user: { id: user.id, email: user.email, subscribed: user.subscribed }, accessToken });
};

// ... refresh, logout, forgotPassword, resetPassword, verifyEmail, profile
