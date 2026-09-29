import { Router } from 'express';
import { chatStreamHandler } from './controller.js';
import { validate } from '../../middleware/validation.middleware.js';
import { chatMessageSchema } from '@reddit-clone/shared';
import { isValidUser } from '../user/middleware.js';

export const chatRouter = Router().post(
  '/stream',
  isValidUser,
  validate(chatMessageSchema),
  chatStreamHandler,
);
