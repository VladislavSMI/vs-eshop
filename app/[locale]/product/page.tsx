import React from 'react';
import { ProductCardWrapper } from '@/components/product/ProductCard/ProductCardWrapper';
import { getAllProductsUseCase } from '@/use-cases/product';

export default async function Product() {
  const products = await getAllProductsUseCase();

  return (
    <div className="mx-auto mt-5 grid max-w-screen-2xl grid-cols-1 gap-8 px-5 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCardWrapper
          product={product}
          useTilt={false}
          useLink
          key={product.productId}
        />
      ))}
    </div>
  );
}
