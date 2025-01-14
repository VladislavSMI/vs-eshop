import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="h-full w-full animate-pulse rounded-lg border border-neutral/60 bg-neutral/80 p-5 shadow-md">
    <div className="h-48 w-full rounded-lg bg-neutral/50" />
    <div className="mt-4 h-4 w-3/4 rounded bg-neutral/50" />
  </div>
);
