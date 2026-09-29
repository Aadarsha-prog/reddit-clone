import { tool } from 'ai';
import z from 'zod';
import { searchPosts } from '../../../post/service.js';

export const searchKbTool = tool({
  description: 'Search the blog knowledge base',
  inputSchema: z.object({
    q: z.string().min(1, 'Query must be at least 1 character long'),
    limit: z.number().min(1).max(10).optional(),
  }),
  execute: searchPosts,
});
