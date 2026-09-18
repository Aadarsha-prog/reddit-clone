import type { Request, Response } from 'express';
import { sendResponse } from '../../http/response/index.js';
import type { LoginInput, SignupInput } from '@reddit-clone/shared';
import { login, logout, signup } from './service.js';

export async function authCheckHandler(req: Request, res: Response) {
  return sendResponse({
    message: 'ok',
    res,
    statusCode: 200,
  });
}

export async function authLoginHandler(req: Request, res: Response) {
  const body = req.validatedBody as LoginInput;
  await login(res, body);

  return sendResponse({
    message: 'Login successful',
    res,
    statusCode: 200,
  });
}

export async function authSignupHandler(req: Request, res: Response) {
  const body = req.validatedBody as SignupInput;

  await signup(body);

  return sendResponse({
    message: 'Signup successful',
    res,
    statusCode: 200,
  });
}
export async function authLogoutHandler(req: Request, res: Response) {
  await logout(res);
  return sendResponse({
    message: 'Logout successful',
    res,
    statusCode: 200,
  });
}
