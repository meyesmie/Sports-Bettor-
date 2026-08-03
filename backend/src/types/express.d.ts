import { User, Admin } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User | Admin; // populated by auth middleware
      admin?: Admin;
    }
  }
}
