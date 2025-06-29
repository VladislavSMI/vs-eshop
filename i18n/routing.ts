import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { CONST } from '@/lib/const';

export const routing = defineRouting({
  locales: CONST.locales,
  defaultLocale: CONST.locales[0],
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
