import { Router } from 'express';
import { authLoginHandler, authLogoutHandler, authSignupHandler } from './controller.js';
import { validate } from '../../middleware/validation.middleware.js';
import { loginSchema, signupSchema } from '@reddit-clone/shared';

export const authRouter = Router()
  .post('/login', validate(loginSchema), authLoginHandler)
  .post('/signup', validate(signupSchema), authSignupHandler)
  .post('/logout', authLogoutHandler);
