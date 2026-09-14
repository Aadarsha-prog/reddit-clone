import type { PostCreateInput, PostUpdateInput, QueryParamSchema } from '@reddit-clone/shared';
import { dbInstance } from '../../db/connection.js';
import { postsTable } from '../../db/schemas/modules/post.table.js';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export function getAllPosts(queryParams?: QueryParamSchema) {
  const { title } = queryParams ?? {};
  return dbInstance.query.postsTable.findMany({
    where: {
      ...(title
        ? {
            title: {
              like: `%${title}%`,
            },
          }
        : undefined),
    },
  });
}

export function getPostById(postId: number) {
  return dbInstance.query.postsTable.findFirst({
    where: {
      id: postId,
    },
  });
}

export function createPost(post: PostCreateInput) {
  const slug = post.title.toLowerCase().replaceAll(' ', '-') + '-' + nanoid(6);
  return dbInstance.insert(postsTable).values({ ...post, slug });
}

export function updatePost(postId: number, post: PostUpdateInput) {
  return dbInstance.update(postsTable).set(post).where(eq(postsTable.id, postId));
}

export function deletePost(postId: number) {
  return dbInstance.delete(postsTable).where(eq(postsTable.id, postId));
}
