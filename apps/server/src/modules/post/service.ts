import type { PostCreateInput, PostUpdateInput, QueryParamSchema } from '@reddit-clone/shared';
import { dbInstance } from '../../db/connection.js';
import { postsTable } from '../../db/schemas/modules/post.table.js';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { userColumns } from '../user/services.js';

export function postColumns() {
  return {
    id: true,
    content: true,
    title: true,
    created_at: true,
    slug: true,
    updated_at: true,
  } as const;
}

export function getAllPosts(queryParams?: QueryParamSchema) {
  const { title } = queryParams ?? {};
  return dbInstance.query.postsTable.findMany({
    columns: postColumns(),
    where: {
      ...(title
        ? {
            title: {
              like: `%${title}%`,
            },
          }
        : undefined),
    },
    with: {
      user: {
        columns: userColumns(),
      },
    },
  });
}

export function getPostById(postId: number) {
  return dbInstance.query.postsTable.findFirst({
    columns: postColumns(),

    where: {
      id: postId,
    },
    with: {
      user: {
        columns: userColumns(),
      },
    },
  });
}

export function getPostBySlug(slug: string) {
  return dbInstance.query.postsTable.findFirst({
    columns: postColumns(),
    where: {
      slug: slug,
    },
    with: {
      user: {
        columns: userColumns(),
      },
    },
  });
}

export function createPost(args: { post: PostCreateInput; userId: number }) {
  const { post, userId } = args;
  const slug = post.title.toLowerCase().replaceAll(' ', '-') + '-' + nanoid(6);
  return dbInstance.insert(postsTable).values({ ...post, slug, user_id: userId });
}

export function updatePost(postId: number, post: PostUpdateInput) {
  return dbInstance.update(postsTable).set(post).where(eq(postsTable.id, postId));
}

export function deletePost(postId: number) {
  return dbInstance.delete(postsTable).where(eq(postsTable.id, postId));
}
