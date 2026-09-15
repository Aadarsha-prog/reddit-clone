import { eq } from 'drizzle-orm';
import { dbInstance } from '../../db/connection.js';
import { usersTable, type UserTable } from '../../db/schemas/index.js';
import { CustomError } from '../../http/error/customError.js';

export async function getUserById(userId: number) {
  const users = await dbInstance
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  const user = users.at(0);

  if (!user) throw new CustomError('User not found', 404);

  return user;
}

export function cleanUser(user: UserTable) {
  const { password, ...cleanedUser } = user;
  return cleanedUser;
}
