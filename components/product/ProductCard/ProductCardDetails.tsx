'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Price } from '@/components/ui/Price';
import { ProductDetails } from '@/lib/types';
import { useCartActions } from '@/lib/hooks/useCartActions';
import { Message } from '@/components/ui/Message';
import { hasAvailableSizes } from '@/lib/utils/productUtils';

export const ProductCardDetails = ({
  product: {
    productId,
    productName,
    categoryName,
    price,
    descriptions,
    variations,
  },
}: {
  product: ProductDetails;
}) => {
  const {
    isPending,
    cartSelection,
    successMessage,
    errorMessage,
    errorFields,
    updateCartSelection,
    addToCart,
  } = useCartActions();

  const handleSizeSelection = (sizeId: number) => {
    updateCartSelection({ productId, sizeId });
  };

  const t = useTranslations('components.cart');

  return (
    <div className="card h-full w-full bg-secondary p-4 text-neutral-content">
      <h1 className="text-2xl font-bold text-primary">{productName}</h1>
      <p className="text-lg text-secondary-content">{categoryName}</p>
      <Price className="text-lg font-bold" price={price} currencyCode="EUR" />

      <p className="mt-5 text-lg text-secondary-content">
        {descriptions[0]?.description}
      </p>

      <div className="mt-4">
        <div className="mt-3 flex flex-wrap gap-2 rounded-lg p-2">
          {variations.map(({ sizeId, stockQuantity, size }) => (
            <button
              type="button"
              key={sizeId}
              onClick={() => handleSizeSelection(sizeId)}
              disabled={!stockQuantity}
              className={clsx(
                'btn btn-sm rounded-lg font-semibold transition-all',
                {
                  'btn-primary': cartSelection.sizeId === sizeId,
                  'btn-outline':
                    stockQuantity && cartSelection.sizeId !== sizeId,
                  'btn-disabled': !stockQuantity,
                },
              )}
            >
              {size}
            </button>
          ))}
        </div>
        {errorFields?.sizeId && (
          <p className="text-error">{errorFields.sizeId}</p>
        )}
      </div>

      <Message message={successMessage} type="success" />
      <Message message={errorMessage} type="error" />

      {hasAvailableSizes(variations) ? (
        <button
          type="button"
          onClick={addToCart}
          disabled={isPending}
          className={clsx('btn btn-outline mt-4 w-full', {
            'cursor-not-allowed': isPending,
          })}
        >
          {isPending ? t('adding') : t('addToCart')}
        </button>
      ) : (
        <p className="mt-4 text-center text-lg font-semibold text-error">
          {t('outOfStock')}
        </p>
      )}
    </div>
  );
};
