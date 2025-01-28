'use client';

import { Bars3Icon, HomeIcon } from '@heroicons/react/24/outline';
import { Dropdown } from '@/components/ui/DropDown';
import { Category } from '@/lib/types';
import { Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

type MenuDropdownProps = {
  categories: Category[];
  home: string;
  allProducts: string;
};

export const MenuDropdown = ({
  categories,
  home,
  allProducts,
}: MenuDropdownProps) => {
  const searchParams = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries());

  return (
    <Dropdown
      icon={<Bars3Icon className="h-6" />}
      position="left"
      contentClassName="w-52 rounded-box"
    >
      {(closeDropdown) => (
        <ul className="menu p-2">
          <li className="mb-4 border-b-[0.5px] border-primary md:hidden">
            <Link
              href="/"
              className="flex items-center space-x-2 py-2 hover:border-primary hover:text-primary"
              onClick={() => closeDropdown()}
            >
              <HomeIcon className="h-6 w-6 animate-breathing" />
              <span className="text-lg font-semibold">{home}</span>
            </Link>
          </li>

          {categories.map((category) => (
            <li key={category.categoryId}>
              <Link
                href={{
                  pathname: '/product',
                  query: {
                    ...currentParams,
                    categoryId: category.categoryId.toString(),
                  },
                }}
                onClick={() => closeDropdown()}
              >
                {category.categoryName}
              </Link>
            </li>
          ))}

          <li>
            <Link href="/product" onClick={() => closeDropdown()}>
              {allProducts}
            </Link>
          </li>
        </ul>
      )}
    </Dropdown>
  );
};
