import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { StaticPageFooter } from '@/components/layout/StaticPageFooter';
import { PageProps } from '@/lib/types';

/**
 * Enforces static rendering for this page, overriding dynamic behavior propagation.
 *
 * Issue:
 * According to the Next.js documentation, using dynamic APIs like `cookies()` in layouts
 * or pages will make the entire route dynamic. However, in practice, even using `cookies()`
 * inside a Server Component (not directly in a layout or page) can still propagate dynamic behavior
 * to the entire route, causing pages intended for SSG to be treated as SSR at runtime.
 *
 * Fix:
 * Adding `export const dynamic = 'force-static';` ensures this page remains static (SSG),
 * even if other components or layouts include dynamic features like `cookies()`.
 *
 * Note:
 * This is a current solution due to limitations in Next.js. Follow updates:
 * https://nextjs.org/docs/app/api-reference/functions/cookies
 */

export const dynamic = 'force-static';

export default function About({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return <StaticPageFooter translationKey="pages.aboutUs" />;
}
