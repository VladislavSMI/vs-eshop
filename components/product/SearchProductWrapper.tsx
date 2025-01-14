'use client';

import { useInView } from 'react-intersection-observer';
import { ProductCardWrapper } from '@/components/product/ProductCard/ProductCardWrapper';
import { Product, SearchParams } from '@/lib/types';
import { useSearchProducts } from '@/lib/hooks/useSearchProduct';
import React, { useEffect, Fragment } from 'react';

export const SearchProductWrapper = ({
  products,
  searchParams,
}: {
  products: Product[];
  searchParams?: SearchParams;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useSearchProducts(products, searchParams);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="mx-auto mt-5 grid max-w-screen-2xl grid-cols-1 gap-8 px-5 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pages.map((group, i) => (
          <Fragment key={data.pageParams[i] as string}>
            {group.map((product) => (
              <ProductCardWrapper
                product={product}
                useTilt
                useLink
                key={product.productId}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div className="text-center">
        {isFetchingNextPage && hasNextPage && (
          <span className="loading loading-bars loading-lg" />
        )}
      </div>

      <div ref={ref} className="h-10 w-full" />
    </>
  );
};
