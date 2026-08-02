import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded: any = jwt.verify(token, config.jwtSecret);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authenticateAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.adminAccessToken || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded: any = jwt.verify(token, config.jwtSecret);
    const admin = await prisma.admin.findUnique({ where: { id: decoded.adminId } });
    if (!admin) return res.status(401).json({ message: 'Admin not found' });
    req.user = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
