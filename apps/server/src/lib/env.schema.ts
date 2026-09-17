import z from 'zod';
import 'dotenv/config';

export enum E_NODE_ENV_ENUM {
  local = 'local',
  development = 'development',
  staging = 'staging',
  production = 'production',
}

const envSchema = z.object({
  NODE_ENV: z.enum(E_NODE_ENV_ENUM, {
    error() {
      return {
        message: `Invalid enum. Use one of ${Object.values(E_NODE_ENV_ENUM).join(', ')}`,
      };
    },
  }),
  DATABASE_URL: z
    .string('DATABASE_URL is required and must be a valid string')
    .min(1, 'DATABASE_URL is required and must be a valid string'),
  ACCESS_TOKEN_SECRET: z
    .string('ACCESS_TOKEN_SECRET is required and must be a valid string')
    .min(1, 'ACCESS_TOKEN_SECRET is required and must be a valid string'),
});

export const env = envSchema.parse(process.env);
