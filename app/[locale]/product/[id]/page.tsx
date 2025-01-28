import React from 'react';
import { ProductCardWrapper } from '@/components/product/ProductCard/ProductCardWrapper';
import { ProductCardDetails } from '@/components/product/ProductCard/ProductCardDetails';
import { Carousel } from '@/components/ui/Carousel';
import { LocalizedSectionHeader } from '@/components/ui/LocalizedSectionHeader';
import { Locale } from '@/lib/types';
import {
  getAllProductsUseCase,
  getProductByIdUseCase,
} from '@/use-cases/product';

export default async function ProductDetailPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const { locale, id } = params;

  const product = await getProductByIdUseCase(id, locale);
  const products = await getAllProductsUseCase();

  return (
    <div className="mx-auto mt-5 max-w-screen-2xl px-5 pb-5">
      <div className="flex flex-col md:flex-row">
        <div className="aspect-square rounded-lg sm:aspect-square md:mr-5 md:aspect-auto md:basis-1/2">
          <ProductCardWrapper
            product={product}
            useTilt
            useLink={false}
            showPrice={false}
          />
        </div>
        <div className="rounded-lg bg-secondary p-5 md:basis-1/2">
          <ProductCardDetails product={product} />
        </div>
      </div>
      <LocalizedSectionHeader translationKey="sections.newArrivals.title" />
      <Carousel products={products} />
    </div>
  );
}
