import type { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../http/error/customError.js';
import { verifyJWTToken } from '../token/service.js';
import { env } from '../../lib/env.schema.js';
import { getUserById } from './services.js';
import { AUTH_ACCESS_TOKEN_COOKIE_NAME } from '../../lib/constants/auth.constants.js';

export async function isValidUser(req: Request, res: Response, next: NextFunction) {
  // Check headers for the access token
  const headers = req.headers;
  const cookies = req.cookies;

  const accessToken =
    cookies[AUTH_ACCESS_TOKEN_COOKIE_NAME] ?? headers['authorization']?.split('Bearer ')[1];

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
