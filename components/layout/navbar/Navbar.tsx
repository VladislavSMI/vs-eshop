import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Bars3Icon, HomeIcon } from '@heroicons/react/24/outline';

import { Link } from '@/i18n/routing';
import Search from '@/components/search/Search';
import { SearchSkeleton } from '@/components/search/SearchSkeleton';
import { Dropdown } from '@/components/ui/DropDown';
import LanguageSwitcher from '@/components/layout/language-switcher/LanguageSwitcher';
import { LanguageSwitcherSkeleton } from '@/components/layout/language-switcher/LanguageSwitcherSkeleton';
import { Logo } from '@/components/icons/Logo';
import CartButton from '@/components/layout/cart-button/CartButton';
import { getAllCategoriesUseCase } from '@/use-cases/categories';
import { CartButtonSkeleton } from '@/components/layout/cart-button/CartButtonSkeleton';

export default async function Navbar() {
  const t = await getTranslations('navigation');
  const categories = await getAllCategoriesUseCase();

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-base-100 p-3 shadow-md">
      <div className="flex items-center space-x-4 md:basis-1/4">
        <Dropdown
          icon={<Bars3Icon className="h-6" />}
          position="left"
          contentClassName="w-52 rounded-box"
        >
          <ul className="menu p-2">
            <li className="mb-4 border-b-[0.5px] border-primary md:hidden">
              <Link
                href="/"
                className="flex items-center space-x-2 py-2 hover:border-primary hover:text-primary"
              >
                <HomeIcon className="h-6 w-6 animate-breathing" />
                <span className="text-lg font-semibold">{t('home')}</span>
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.categoryId}>
                <Link
                  href={{
                    pathname: '/product',
                    query: { category: category.categoryId },
                  }}
                >
                  {category.categoryName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/product">{t('allProducts')}</Link>
            </li>
          </ul>
        </Dropdown>
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
          <Search placeholder={t('searchPlaceholder')} />
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
}
