import Image from 'next/image';
import React, { ReactNode } from 'react';
import { Product } from '@/lib/types';
import { getPublicUrl } from '@/lib/utils/utils';
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

/**
 * - **LinkWrapper Behavior:**
 *   - We have two LinkWrapper components:
 *   - 1. Outer LinkWrapper wraps the entire ProductCard when useLink is true.
 *   - 2. Inner LinkWrapper (inside ProductCard) wraps only the ProductCardInfo component(product name and price).
 *   - Only one LinkWrapper should be active at a time to avoid nested links issues:
 *      - When useLink is true, the outer LinkWrapper is active, and the inner LinkWrapper is disabled.
 *      - When useLink is false, the outer LinkWrapper is disabled, and the inner LinkWrapper is active.
 *   - This is achieved by passing !useLink to the inner LinkWrapper's useLink prop.
 *  - Why are we doing this? For example, in normal case we want the entire image be clickable, but in some cases we want only the product name and price to be clickable
 *    e.g. 3D model where user can click on the image to rotate the model.
 */

export const ProductCardWrapper = ({
  product: { productId, productName, price, mainImageUrl },
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
            className="rounded-lg border-none object-contain p-5 transition-transform duration-500 hover:scale-[1.1]"
            src={getPublicUrl(mainImageUrl)}
            alt={productName}
            fill
            sizes="(min-width: 1024px) 300px, 200px"
          />
        )}
      </ProductCard>
    </LinkWrapper>
  </TiltWrapper>
);
