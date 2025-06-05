import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { executeQuery } from '../../lib/db';

const users = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john.doe@skateshop.com',
    password: 'password1#2#3#',
  },
];

export async function seedUsers() {
  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      return executeQuery({
        query: `
          INSERT INTO users (id, name, email, password)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (email) DO NOTHING;
        `,
        values: [user.id, user.name, user.email, hashedPassword],
      });
    }),
  );
}
