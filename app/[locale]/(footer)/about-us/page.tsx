import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { StaticPageFooter } from '@/components/layout/StaticPageFooter';
import { PageProps } from '@/lib/types';

/**
 * Currently, this page is statically generated (SSG), as confirmed by the build output.
 *
 * However, because the shared layout (BaseLayout) includes the Navbar, which renders
 * the server `CartButton` (accessing cookies), this route is treated as dynamic at runtime.
 *
 * As a result, Next.js disables CDN caching by setting:
 *
 *   cache-control: private, no-cache, no-store, max-age=0, must-revalidate
 *
 * This means the page is still SSG (generated at build time), but it's not cacheable,
 * which defeats some of the performance benefits of static pages like About Us.
 *
 * ⚠️ If we add `export const dynamic = 'force-static'`, Next.js will restore correct
 * CDN cache headers (`s-maxage=31536000, stale-while-revalidate`) — **but** any dynamic
 * logic that relies on `cookies()` (like the cart icon in the Navbar) will break
 * because the cart will no longer be able to read cookies at runtime.
 *
 * TODO: Refactor layout strategy to enable CDN caching on static pages:
 *
 * - Option A: Accept no caching and keep the dynamic cart visible (current behavior).
 * - Option B: Move static pages like About Us to a separate layout that excludes
 *             the Navbar and cart logic, and re-enable `export const dynamic = 'force-static'`
 *             to benefit from full CDN caching.
 *
 * See: https://nextjs.org/docs/app/building-your-application/caching#automatic-caching
 * See also: https://nextjs.org/docs/app/api-reference/functions/cookies#dynamic-rendering
 */

export default function About({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return <StaticPageFooter translationKey="pages.aboutUs" />;
}
