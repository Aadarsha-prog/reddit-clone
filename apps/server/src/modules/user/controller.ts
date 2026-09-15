import type { Request, Response } from 'express';
import { sendResponse } from '../../http/response/index.js';
import { cleanUser } from './services.js';
import { CustomError } from '../../http/error/customError.js';

export async function getCurrentUserHandler(req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) throw new CustomError('Unauthorized', 401);

  return sendResponse({
    data: cleanUser(user),
    message: 'Current user fetched successfully',
    res,
    statusCode: 200,
  });
}
