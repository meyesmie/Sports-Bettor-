// backend/src/server.ts

import app from './app';
import { config } from './config/env';
import prisma from './config/db';
import logger from './utils/logger';

// Validate essential environment variables
const requiredEnvs = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'DATABASE_URL',
  'PAYPAL_CLIENT_ID',
  'PAYPAL_SECRET',
  'SKRILL_MERCHANT_EMAIL',
  'PAYSTACK_SECRET_KEY',
];

for (const envVar of requiredEnvs) {
  if (!process.env[envVar]) {
    logger.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const PORT = config.port || 5000;

// Test database connection before starting server
prisma
  .$connect()
  .then(() => {
    logger.info('✅ Database connected successfully');
  })
  .catch((err) => {
    logger.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  });

// Start Express server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Sports Bettor backend running on port ${PORT}`);
  logger.info(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// ---------------------------------------------------------------------------
// Graceful Shutdown
// ---------------------------------------------------------------------------
const gracefulShutdown = async (signal: string) => {
  logger.warn(`${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    logger.info('HTTP server closed');
    await prisma.$disconnect();
    logger.info('Database connection closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Catch unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});
