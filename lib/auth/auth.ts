import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import * as bcrypt from 'bcryptjs';
import { getUserByEmailUseCase } from '@/use-cases/user';
import { UserSchema } from '../validation/schemas/userSchema';

export const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        const { success, data } = UserSchema.safeParse({
          email,
          password,
        });

        if (!success) return null;

        const user = await getUserByEmailUseCase(data.email);

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
