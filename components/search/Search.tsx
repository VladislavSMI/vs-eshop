'use client';

import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type SearchProps = {
  placeholder: string;
};

export default function Search({ placeholder }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex w-full max-w-lg">
      <label htmlFor="search" className="sr-only">
        {placeholder}
      </label>
      <input
        id="search"
        type="text"
        className="input input-bordered w-full pl-10 text-sm focus:outline-none focus:ring-1"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query') || ''}
        aria-label={placeholder}
      />
      <MagnifyingGlassIcon className="text-primary-500 absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
    </div>
  );
}
