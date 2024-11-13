import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function SearchSkeleton() {
  return (
    <div className="relative flex w-full max-w-lg animate-pulse">
      <div className="block w-full rounded-md border border-gray-200 bg-gray-200 py-2 pl-10 pr-3 text-sm dark:border-neutral-800 dark:bg-neutral-800" />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
