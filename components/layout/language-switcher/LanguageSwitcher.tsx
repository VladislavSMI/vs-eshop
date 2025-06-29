'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { clsx } from 'clsx';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Dropdown } from '@/components/ui/DropDown';
import { routing } from '@/i18n/routing';
import { changeLanguage } from '@/lib/utils/changeLanguage';
import { Locale } from '@/lib/types';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale() as Locale;

  const handleLanguageChange = (newLocale: string) => {
    changeLanguage(router, newLocale, pathname, searchParams);
  };

  return (
    <Dropdown
      icon={<GlobeAltIcon className="h-6 w-6" />}
      position="right"
      contentClassName="w-24 rounded-lg"
      ariaLabel="Change language dropdown"
    >
      {(closeDropdown) => (
        <ul className="menu p-2">
          {routing.locales.map((lng) => (
            <button
              type="button"
              key={lng}
              onClick={() => {
                handleLanguageChange(lng);
                closeDropdown();
              }}
              className={clsx(
                'btn btn-ghost m-2',
                lng === locale && 'btn-outline font-semibold',
              )}
              aria-label={`Change language ${lng}`}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </ul>
      )}
    </Dropdown>
  );
};
