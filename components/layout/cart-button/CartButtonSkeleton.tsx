import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';

export function CartButtonSkeleton() {
  return (
    <div className="btn btn-circle btn-ghost">
      <div className="indicator">
        <ShoppingCartIcon className="h-6 w-6 text-gray-400" />
        <span className="badge indicator-item badge-primary badge-sm opacity-50">
          0
        </span>
      </div>
    </div>
  );
}
