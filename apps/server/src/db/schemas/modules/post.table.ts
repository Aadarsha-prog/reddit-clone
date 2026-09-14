import { integer, pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';

export const postsTable = pgTable(
  'post',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    content: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    // Create a slug
    slug: text().unique().notNull(),
    updated_at: timestamp()
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => {
    return [index('title_idx').on(table.title)];
  },
);
