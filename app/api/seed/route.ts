import { seedUsers } from '@/data/seeds/seedUsers';
import { log } from '@/lib/logging/log';

export async function GET() {
  try {
    await seedUsers();
    log.info('Users seeded successfully');

    return Response.json({ message: 'Users seeded successfully' });
  } catch (error) {
    log.error({ error }, 'Failed to seed users');
    return Response.json({ error: 'Failed to seed users' }, { status: 500 });
  }
}
