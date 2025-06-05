import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';

import { Link } from '@/i18n/routing';
import { Search } from '@/components/search/Search';
import { LanguageSwitcher } from '@/components/layout/language-switcher/LanguageSwitcher';
import { Logo } from '@/components/icons/Logo';
import { CartButton } from '@/components/layout/cart-button/CartButton';
import { getAllCategoriesUseCase } from '@/use-cases/categories';
import { CartButtonSkeleton } from '@/components/layout/cart-button/CartButtonSkeleton';
import { auth } from '@/lib/auth/auth';
import { MenuDropdown } from '../menu-dropdown/MenuDropdown';

export const Navbar = async () => {
  const t = await getTranslations('navigation');
  const categories = await getAllCategoriesUseCase();
  const session = await getServerSession(auth);

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-base-100 p-3 shadow-md">
      <div className="flex items-center space-x-4 md:basis-1/4">
        <MenuDropdown
          categories={categories}
          home={t('home')}
          allProducts={t('allProducts')}
          isAuthenticated={!!session?.user?.email}
        />
        <Link
          href="/"
          className="btn btn-ghost hidden items-center text-xl md:inline-flex"
        >
          <Logo />
          <span className="hidden lg:inline-flex"> skate shop</span>
        </Link>
      </div>

      <div className="flex flex-grow justify-center pl-2 pr-2">
        <Search placeholder={t('searchPlaceholder')} pathname="product" />
      </div>

      <div className="flex items-center justify-end md:basis-1/4">
        <LanguageSwitcher />

        <div>
          <Suspense fallback={<CartButtonSkeleton />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};
