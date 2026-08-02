import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  databaseUrl: process.env.DATABASE_URL!,
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID!,
    secret: process.env.PAYPAL_SECRET!,
  },
  skrill: {
    merchantEmail: process.env.SKRILL_MERCHANT_EMAIL!,
    secretWord: process.env.SKRILL_SECRET_WORD!,
  },
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY!,
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
