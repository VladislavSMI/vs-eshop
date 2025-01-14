'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { Crumb } from '@/lib/types';

type CrumbsProps = {
  crumbs: Crumb[];
  onRemove: (id: string) => void;
};

export const Crumbs = ({ crumbs, onRemove }: CrumbsProps) => {
  if (!crumbs?.length) {
    return null;
  }

  return (
    <div className="m-5 flex flex-wrap items-center justify-center gap-4 p-2">
      {crumbs.map((crumb) => (
        <div
          key={crumb.id}
          className="badge flex items-center justify-center bg-secondary p-4 text-sm hover:bg-accent-content"
        >
          <span className="text-primary">{`${crumb.label}: ${crumb.value}`}</span>
          <button
            onClick={() => onRemove(crumb.id)}
            type="button"
            className="ml-2 text-primary"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      ))}
    </div>
  );
};
