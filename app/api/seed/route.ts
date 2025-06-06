import { NextRequest, NextResponse } from 'next/server';
import { seedUsers } from '@/data/seeds/seedUsers';
import { log } from '@/lib/logging/log';
import { verifyMethodAndToken } from '@/lib/utils/apiUtils/verifyMethodAndToken';

export async function POST(req: NextRequest) {
  log.info('Get seed users request received');

  const { method } = req;
  const { searchParams, pathname } = req.nextUrl;
  const token = searchParams.get('token') as string;

  const isTokenAndMethodVerified = verifyMethodAndToken({
    token,
    tokenKey: 'seed',
    method,
    expectedMethod: 'POST',
    apiEndpoint: pathname,
  });

  if (!isTokenAndMethodVerified) {
    return NextResponse.json(
      { error: 'Invalid token or method' },
      { status: 403 },
    );
  }

  try {
    await seedUsers();
    log.info('Users seeded successfully');

    return NextResponse.json({ message: 'Users seeded successfully' });
  } catch (error) {
    log.error({ error }, 'Failed to seed users');

    return NextResponse.json(
      { error: 'Failed to seed users' },
      { status: 500 },
    );
  }
}
