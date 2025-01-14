'use client';

import React, { ReactNode } from 'react';
import { LinkWrapper } from '@/components/ui/Wrapper/LinkWrapper';
import { Product } from '@/lib/types';
import { ProductCardInfo } from './ProductCardInfo';

export const ProductCard = ({
  name,
  productId,
  price,
  currencyCode = 'EUR',
  position,
  children,
  showPrice = true,
  useLink,
}: {
  name: Product['productName'];
  productId: Product['productId'];
  price: Product['price'];
  currencyCode?: string;
  position: 'bottom' | 'center';
  children: ReactNode;
  showPrice?: boolean;
  useLink: boolean;
}) => (
  <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-transparent bg-base-100 p-5 shadow-[2px_4px_10px_rgba(255,255,255,0.3)] transition-all duration-500 hover:animate-completeBorder">
    {children}
    {showPrice && (
      <LinkWrapper href={`/product/${productId}`} useLink={useLink}>
        <ProductCardInfo
          name={name}
          price={price}
          currencyCode={currencyCode}
          position={position}
        />
      </LinkWrapper>
    )}
  </div>
);
