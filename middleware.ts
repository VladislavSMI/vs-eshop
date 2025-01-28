import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  if (req.url.includes('/checkout/success')) {
    response.cookies.set('vs_shop_cart_id', '', { path: '/', maxAge: 0 });
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|nl)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
