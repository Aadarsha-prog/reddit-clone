import { Router } from 'express';
import { getCurrentUserHandler } from './controller.js';
import { isValidUser } from './middleware.js';

export const userRouter = Router().get('/me', isValidUser, getCurrentUserHandler);
