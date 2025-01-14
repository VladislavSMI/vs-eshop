'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from '@/lib/hooks/useDebouncedCallback';

type SearchProps = {
  placeholder: string;
  pathname: string;
};

export const Search = ({ placeholder, pathname }: SearchProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';

  const [searchTerm, setSearchTerm] = useState<string>(query);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    const trimmedTerm = term.trim();
    if (trimmedTerm) {
      params.set('query', trimmedTerm);
    } else {
      params.delete('query');
    }
    router.replace(`/${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex w-full max-w-lg">
      <label htmlFor="search" className="sr-only">
        {placeholder}
      </label>
      <input
        id="search"
        type="text"
        className="input w-full pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
        aria-label={placeholder}
      />
      <MagnifyingGlassIcon className="text-primary-500 absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
    </div>
  );
};
