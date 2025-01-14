import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import { Search } from '@/components/search/Search';
import { SearchSkeleton } from '@/components/search/SearchSkeleton';
import { LanguageSwitcher } from '@/components/layout/language-switcher/LanguageSwitcher';
import { LanguageSwitcherSkeleton } from '@/components/layout/language-switcher/LanguageSwitcherSkeleton';
import { Logo } from '@/components/icons/Logo';
import { CartButton } from '@/components/layout/cart-button/CartButton';
import { getAllCategoriesUseCase } from '@/use-cases/categories';
import { CartButtonSkeleton } from '@/components/layout/cart-button/CartButtonSkeleton';
import { MenuDropdown } from '../menu-dropdown/MenuDropdown';
import { MenuDropdownSkeleton } from '../menu-dropdown/MenuDropdownSkeleton';

export const Navbar = async () => {
  const t = await getTranslations('navigation');
  const categories = await getAllCategoriesUseCase();

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-base-100 p-3 shadow-md">
      <div className="flex items-center space-x-4 md:basis-1/4">
        <Suspense fallback={<MenuDropdownSkeleton />}>
          <MenuDropdown
            categories={categories}
            home={t('home')}
            allProducts={t('allProducts')}
          />
        </Suspense>

        <Link
          href="/"
          className="btn btn-ghost hidden items-center text-xl md:inline-flex"
        >
          <Logo />
          <span className="hidden lg:inline-flex"> skate shop</span>
        </Link>
      </div>

      <div className="flex flex-grow justify-center pl-2 pr-2">
        <Suspense fallback={<SearchSkeleton />}>
          <Search placeholder={t('searchPlaceholder')} pathname="product" />
        </Suspense>
      </div>

      <div className="flex items-center justify-end md:basis-1/4">
        <Suspense fallback={<LanguageSwitcherSkeleton />}>
          <LanguageSwitcher />
        </Suspense>
        <div>
          <Suspense fallback={<CartButtonSkeleton />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};
