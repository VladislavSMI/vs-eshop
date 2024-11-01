import React, { FC, FunctionComponent } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';

export const ProductCard: FunctionComponent<{ product: Product }> = ({
  product: { image_url, product_name, price }
}) => {
  return (
    <div className="h-80 w-64 rounded-lg border border-transparent bg-black p-4 text-white shadow-lg transition-all duration-300 hover:border-gray-500 hover:shadow-2xl">
      <div className="relative h-48 w-full">
        <Image
          src={image_url}
          alt={product_name}
          fill
          className="rounded-lg transition-transform duration-500 hover:scale-105 dark:invert"
        />
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{product_name}</h3>
        <p className="text-gray-400">${price}</p>
      </div>
    </div>
  );
};
