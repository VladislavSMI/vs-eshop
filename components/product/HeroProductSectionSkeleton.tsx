import React from 'react';
import { getRange } from '@/lib/utils/utils';
import { ProductCardSkeleton } from './ProductCard/ProductCardSkeleton';

export const HeroProductSectionSkeleton = () => (
  <section className="mx-auto mt-5 grid max-w-screen-2xl grid-cols-1 gap-8 px-5 pb-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-6 lg:max-h-[calc(100vh-100px)]">
    <div className="aspect-square h-full w-full rounded-lg md:col-span-2 md:row-span-2">
      <ProductCardSkeleton />
    </div>

    {getRange(4).map((range) => (
      <div className="md:col-span-2 md:row-span-1" key={range}>
        <ProductCardSkeleton />
      </div>
    ))}
  </section>
);
