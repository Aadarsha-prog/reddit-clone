import type { LoginInput, SignupInput } from '@reddit-clone/shared';
import { dbInstance } from '../../db/connection.js';
import { usersTable } from '../../db/schemas/index.js';
import { eq } from 'drizzle-orm';
import { CustomError } from '../../http/error/customError.js';
import bcrypt from 'bcrypt';
import { createJWTToken } from '../token/service.js';
import { env } from '../../lib/env.schema.js';

export async function login(body: LoginInput) {
  const { email, password } = body;

  const users = await dbInstance
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  const user = users.at(0);

  if (!user) throw new CustomError('Invalid email or password', 401);

  const comparePasswordMatch = await bcrypt.compare(password, user.password);

  if (!comparePasswordMatch) throw new CustomError('Invalid email or password', 401);

  const accessToken = createJWTToken({
    payload: { userId: user.id },
    secret: env.ACCESS_TOKEN_SECRET,
    opts: {
      expiresIn: '7d', //
    },
  });

  return { accessToken };
}

export async function signup(body: SignupInput) {
  // Find user with same email
  const userWithEmainExists = await dbInstance
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, body.email));

  if (userWithEmainExists.length > 0)
    throw new CustomError('User with this email already exists', 409);

  const salt = await bcrypt.genSalt(10);
  const hasnedPassword = await bcrypt.hash(body.password, salt);

  return dbInstance.insert(usersTable).values({ ...body, password: hasnedPassword });
}
