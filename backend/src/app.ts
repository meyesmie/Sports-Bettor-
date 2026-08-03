// backend/src/app.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';

// Database singleton (imported from config)
import prisma from './config/db';

// Import custom utilities
import { ApiError } from './utils/apiError';
import { sendError } from './utils/response';

// Import route modules
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import matchRoutes from './routes/match.routes';
import predictionRoutes from './routes/prediction.routes';
import premiumPickRoutes from './routes/premiumPick.routes';
import adminRoutes from './routes/admin.routes';
import paymentRoutes from './routes/payment.routes';
import webhookRoutes from './routes/webhook.routes';
import settingRoutes from './routes/setting.routes';
import notificationRoutes from './routes/notification.routes';

// Initialize Express app
const app: Application = express();

// =============================================================================
// Global Middleware
// =============================================================================

// Security headers
app.use(helmet());

// CORS – allow frontend origin and credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Request rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser (for JWT refresh tokens)
app.use(cookieParser());

// Request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// =============================================================================
// Static Files – uploaded team/country logos
// =============================================================================
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// =============================================================================
// API Health Check
// =============================================================================
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// =============================================================================
// API Routes
// =============================================================================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/premium-picks', premiumPickRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/notifications', notificationRoutes);

// =============================================================================
// 404 Handler – for unknown API endpoints
// =============================================================================
app.use((req: Request, res: Response, next: NextFunction) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});

// =============================================================================
// Global Error Handling Middleware
// =============================================================================
app.use((err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Prisma known errors
  if (err.constructor?.name === 'PrismaClientKnownRequestError') {
    return sendError(res, 'Database operation failed', 400);
  }

  // Handle ApiError instances
  if (err instanceof ApiError) {
    return sendError(
      res,
      err.message,
      err.statusCode,
      process.env.NODE_ENV === 'development' ? err.stack : undefined
    );
  }

  // Handle Multer file errors
  if (err.message?.startsWith('Invalid file type')) {
    return sendError(res, err.message, 400);
  }

  // Default to 500 server error
  return sendError(
    res,
    'Internal server error',
    500,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
});

export default app;
