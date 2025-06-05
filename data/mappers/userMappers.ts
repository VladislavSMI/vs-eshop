import { User } from '@/lib/types';
import { UserRow } from '../QueryResults';

const mapUser = (row: UserRow): User => ({
  id: row.id,
  email: row.email,
  name: row.name,
  password: row.password,
});

export const UserMappers = {
  base: mapUser,
};
