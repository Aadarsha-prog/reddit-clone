import { defineRelations } from 'drizzle-orm';
import * as schema from './index.js';

export const appRelations = defineRelations(
  {
    usersTable: schema.usersTable,
    postsTable: schema.postsTable,
    postUserVotesTable: schema.postUserVotesTable,
  },
  (r) => ({
    postsTable: {
      votes: r.many.postUserVotesTable({
        from: r.postsTable.id,
        to: r.postUserVotesTable.post_id,
      }),
      user: r.one.usersTable({
        from: r.postsTable.user_id,
        to: r.usersTable.id,
      }),
    },
    usersTable: {
      votes: r.many.postUserVotesTable({
        from: r.usersTable.id,
        to: r.postUserVotesTable.user_id,
      }),
      posts: r.many.postsTable({
        from: r.usersTable.id,
        to: r.postsTable.user_id,
      }),
    },
    postUserVotesTable: {
      post: r.one.postsTable({
        from: r.postUserVotesTable.post_id,
        to: r.postsTable.id,
      }),
      user: r.one.usersTable({
        from: r.postUserVotesTable.user_id,
        to: r.usersTable.id,
      }),
    },
  }),
);

export const relations = defineRelations({ schema });
