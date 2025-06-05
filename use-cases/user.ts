import { getUserByEmail } from '@/data/repository/UserRepository';

export async function getUserByEmailUseCase(email: string) {
  return getUserByEmail(email);
}
