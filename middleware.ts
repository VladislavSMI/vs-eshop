import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { isProtectedPath } from '@/lib/utils/utils';

const intlMiddleware = createIntlMiddleware(routing);

const middleware = withAuth(
  (req) => {
    const pathname = req.nextUrl.pathname;

    // i18n
    const response = intlMiddleware(req);

    // clear cart cookie on checkout success
    if (pathname.endsWith('/checkout/success')) {
      response.cookies.set('vs_shop_cart_id', '', {
        path: '/',
        maxAge: 0,
      });
    }

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) =>
        isProtectedPath(req.nextUrl.pathname) ? token !== null : true,
    },
    pages: {
      signIn: '/en/sign-in',
      signOut: '/en/sign-out',
    },
  },
);

export default middleware;

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
