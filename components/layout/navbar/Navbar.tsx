'use client';

import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from '@/i18n/routing';

import Search from '@/components/search/Search';
import { SearchSkeleton } from '@/components/search/SearchSkeleton';
import { Dropdown } from '@/components/ui/DropDown';
import { Category } from '@/lib/types';
import LanguageSwitcher from '@/components/layout/language-switcher/LanguageSwitcher';
import { LanguageSwitcherSkeleton } from '@/components/layout/language-switcher/LanguageSwitcherSkeleton';
import { Logo } from '@/components/icons/Logo';

export default function Navbar({ categories }: { categories: Category[] }) {
  const t = useTranslations('navigation');

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-base-100 p-3 shadow-md">
      <div className="flex items-center space-x-4 md:basis-1/4">
        <Dropdown
          icon={<Bars3Icon className="h-6" />}
          position="left"
          contentClassName="w-52 rounded-box"
        >
          <ul className="menu p-2">
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
        <Dropdown
          icon={
            <div className="indicator">
              <span className="badge indicator-item">8</span>
              <ShoppingCartIcon className="h-7 w-7" />
            </div>
          }
          position="right"
          contentClassName="w-52 rounded-lg"
        >
          <div className="card text-center">
            <div className="card-body p-5">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <Link href="/" className="btn btn-block">
                  {t('cart')}
                </Link>
              </div>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
}
