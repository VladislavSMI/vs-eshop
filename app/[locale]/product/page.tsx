import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Message } from '@/components/ui/Message';
import { SearchProductWrapper } from '@/components/product/SearchProductWrapper';
import { getProductSearchUseCase } from '@/use-cases/product';
import { SearchParams } from '@/lib/types';
import { getAllCategoriesUseCase } from '@/use-cases/categories';
import { SearchCrumbs } from '@/components/ui/Crumbs/SearchCrumbs/SearchCrumbs';

export default async function Product({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const products = await getProductSearchUseCase({
    searchParams,
  });

  const t = await getTranslations('pages.product');
  const categories = await getAllCategoriesUseCase();

  return (
    <div className="space-y-4">
      <SearchCrumbs searchParams={searchParams} categories={categories} />
      {!products.length ? (
        <div className="flex h-[50vh] items-center justify-center">
          <Message
            message={t('noProductFound')}
            type="warning"
            className="text-xl"
          />
        </div>
      ) : (
        <SearchProductWrapper products={products} searchParams={searchParams} />
      )}
    </div>
  );
}
