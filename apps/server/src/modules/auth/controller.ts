import type { Request, Response } from 'express';
import { sendResponse } from '../../http/response/index.js';
import type { LoginInput, SignupInput } from '@reddit-clone/shared';
import { login, signup } from './service.js';

export async function authLoginHandler(req: Request, res: Response) {
  const body = req.validatedBody as LoginInput;
  await login(res, body);

  return sendResponse({
    data: null,
    message: 'Login successful',
    res,
    statusCode: 200,
  });
}

export async function authSignupHandler(req: Request, res: Response) {
  const body = req.validatedBody as SignupInput;

  await signup(body);

  return sendResponse({
    data: [],
    message: 'Signup successful',
    res,
    statusCode: 200,
  });
}
export function authLogoutHandler(req: Request, res: Response) {
  return sendResponse({
    data: [],
    message: 'Logout successful',
    res,
    statusCode: 200,
  });
}
