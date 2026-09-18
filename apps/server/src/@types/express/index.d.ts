import type { UserTable } from '../../db/schemas/index.js';

declare global {
  namespace Express {
    interface Request {
      validatedBody?: Record<string, unknown>;
    }

    interface Locals {
      user: Omit<UserTable, 'password'>;
    }
  }
}

export {};
