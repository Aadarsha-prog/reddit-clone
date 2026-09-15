import { z } from 'zod';
import type { ApiResponse } from '../http/types.js';

export const postCreateSchema = z.object({
  title: z.string('Title is required').min(1, 'Title is required'),
  content: z.string('Content is required').min(1, 'Content is required'),
});

export type PostCreateInput = z.infer<typeof postCreateSchema>;

export const postUpdateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type PostUpdateInput = z.infer<typeof postUpdateSchema>;

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
};

export type GetAllPostResponse = ApiResponse<Post[]>;
