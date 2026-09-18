import { Router } from 'express';
import {
  postCreateHandler,
  postDeleteHandler,
  postIndexHandler,
  postRetrieveBySlugHandler,
  postRetrieveHandler,
  postUpdateHandler,
} from './controller.js';
import { validate } from '../../middleware/validation.middleware.js';
import { postCreateSchema, postUpdateSchema } from '@reddit-clone/shared';
import { isValidUser } from '../user/middleware.js';

export const postRouter = Router()
  .get('/', postIndexHandler)
  .get('/:id', postRetrieveHandler)
  .get('/slug/:slug', postRetrieveBySlugHandler)
  .post('/', isValidUser, validate(postCreateSchema), postCreateHandler)
  .patch('/:id', isValidUser, validate(postUpdateSchema), postUpdateHandler)
  .delete('/:id', isValidUser, postDeleteHandler);
