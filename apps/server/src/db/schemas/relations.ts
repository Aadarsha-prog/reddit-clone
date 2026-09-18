import { defineRelations } from 'drizzle-orm';
import * as schema from './index.js';

export const userPostRelation = defineRelations(
  { usersTable: schema.usersTable, postsTable: schema.postsTable },
  (r) => ({
    postsTable: {
      user: r.one.usersTable({
        from: r.postsTable.user_id,
        to: r.usersTable.id,
      }),
    },
    usersTable: {
      posts: r.many.postsTable({
        from: r.usersTable.id,
        to: r.postsTable.user_id,
      }),
    },
  }),
);

export const relations = defineRelations({ schema });
