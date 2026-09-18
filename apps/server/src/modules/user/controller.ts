import type { Request, Response } from 'express';
import { sendResponse } from '../../http/response/index.js';

export async function getCurrentUserHandler(req: Request, res: Response) {
  const user = res.locals.user;

  return sendResponse({
    data: user,
    message: 'Current user fetched successfully',
    res,
    statusCode: 200,
  });
}
