import { executeQuery } from '@/lib/db';
import { UserRow } from '@/data/QueryResults';
import { User } from '@/lib/types';
import { UserMappers } from '../mappers';

export async function getUserByEmail(email: string): Promise<User | null> {
  const query = `
    SELECT * FROM users WHERE email = $1;
  `;

  const values = [email];

  const data = await executeQuery<UserRow>({
    query,
    values,
  });

  return UserMappers.base(data.rows[0]);
}
