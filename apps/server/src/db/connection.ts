import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../lib/env.schema.js';
import { relations, appRelations } from './schemas/relations.js';

export const dbInstance = drizzle(env.DATABASE_URL, {
  relations: { ...relations, ...appRelations },
});
