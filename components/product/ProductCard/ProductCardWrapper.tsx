import Image from 'next/image';
import React, { ReactNode } from 'react';
import { Product } from '@/lib/types';
import { TiltWrapper } from '../../ui/Wrapper/TiltWrapper';
import { LinkWrapper } from '../../ui/Wrapper/LinkWrapper';
import { ProductCard } from './ProductCard';

interface ProductCardWrapperProps {
  product: Product;
  useTilt?: boolean;
  useLink?: boolean;
  imageComponent?: ReactNode;
  position?: 'bottom' | 'center';
  showPrice?: boolean;
}

// We have two LinkWrapper components:
// 1. Outer LinkWrapper wraps the entire ProductCard when useLink is true.
// 2. Inner LinkWrapper (inside ProductCard) wraps only the ProductCardInfo component.
// Only one LinkWrapper should be active at a time to avoid nested links issues:
// - When useLink is true, the outer LinkWrapper is active, and the inner LinkWrapper is disabled.
// - When useLink is false, the outer LinkWrapper is disabled, and the inner LinkWrapper is active.
// This is achieved by passing !useLink to the inner LinkWrapper's useLink prop.

export const ProductCardWrapper = ({
  product: { productId, productName, price, imageUrl },
  useTilt = true,
  useLink = true,
  imageComponent,
  position = 'bottom',
  showPrice = true,
}: ProductCardWrapperProps) => (
  <TiltWrapper useTilt={useTilt} className="h-full w-full rounded-lg">
    <LinkWrapper
      href={`/product/${productId}`}
      useLink={useLink}
      className="relative block aspect-square h-full w-full rounded-lg"
    >
      <ProductCard
        name={productName}
        productId={productId}
        price={price}
        currencyCode="EUR"
        position={position}
        showPrice={showPrice}
        useLink={!useLink}
      >
        {imageComponent || (
          <Image
            className="rounded-lg border-none object-contain p-5 transition-transform duration-500 hover:scale-[1.1] dark:invert"
            src={imageUrl}
            alt={productName}
            fill
            sizes="(min-width: 1024px) 300px, 200px"
          />
        )}
      </ProductCard>
    </LinkWrapper>
  </TiltWrapper>
);
