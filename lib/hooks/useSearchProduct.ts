'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductSearchUseCase } from '@/use-cases/product';
import { Product, SearchParams } from '../types';

export const useSearchProducts = (
  initialData: Product[],
  searchParams?: SearchParams,
) =>
  useInfiniteQuery<Product[]>({
    queryKey: ['products', searchParams],
    queryFn: ({ pageParam = 1 }) =>
      getProductSearchUseCase({
        searchParams: {
          ...searchParams,
          page: Number(pageParam),
        },
      }),

    initialData: {
      pages: [initialData],
      pageParams: [1],
    },

    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
