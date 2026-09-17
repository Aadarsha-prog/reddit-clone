import { Router } from 'express';
import {
  authCheckHandler,
  authLoginHandler,
  authLogoutHandler,
  authSignupHandler,
} from './controller.js';
import { validate } from '../../middleware/validation.middleware.js';
import { loginSchema, signupSchema } from '@reddit-clone/shared';
import { isValidUser } from '../user/middleware.js';

export const authRouter = Router()
  .post('/check', isValidUser, authCheckHandler)
  .post('/login', validate(loginSchema), authLoginHandler)
  .post('/signup', validate(signupSchema), authSignupHandler)
  .post('/logout', authLogoutHandler);
