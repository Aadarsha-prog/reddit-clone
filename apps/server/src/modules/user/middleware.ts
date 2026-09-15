import type { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../http/error/customError.js';
import { verifyJWTToken } from '../token/service.js';
import { env } from '../../lib/env.schema.js';
import { getUserById } from './services.js';

export async function isValidUser(req: Request, res: Response, next: NextFunction) {
  // Check headers for the access token
  const headers = req.headers;

  const accessToken = headers['authorization']?.split('Bearer ')[1];

  if (!accessToken) throw new CustomError('Unauthorized', 401);
  // Verify if this token is valid
  const payload = verifyJWTToken<{ userId: number }>({
    token: accessToken,
    secret: env.ACCESS_TOKEN_SECRET,
  });

  const user = await getUserById(payload.userId);

  res.locals.user = user;

  next();
}
