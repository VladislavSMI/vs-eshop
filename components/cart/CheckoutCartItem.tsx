'use client';

import { useCallback } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCartActions } from '@/lib/hooks/useCartActions';
import { CartItem } from '@/lib/types';
import { Message } from '../ui/Message';
import { QuantityField } from '../ui/Fields/QuantityField';

export const CheckoutCartItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { productId, cartItemId, productName, size, quantity, sizeId, price } =
    cartItem;

  const {
    isPending,
    successMessage,
    errorMessage,
    errorFields,
    updateCartItem,
    deleteCartItem,
  } = useCartActions();

  const handleQuantityChange = useCallback(
    (newQty: number) => {
      updateCartItem({
        cartItemSelection: {
          productId,
          sizeId,
          quantity: newQty,
        },
        isQtyIncremented: false,
      });
    },
    [productId, sizeId, updateCartItem],
  );

  return (
    <li key={productId} className="pb-5">
      <div className="relative flex flex-col border-b">
        <h3 className="font-bold">{productName}</h3>
        <div className="mt-2 text-sm">Size: {size}</div>
        <div className="mb-8 mt-2 flex items-center justify-between rounded-md p-2">
          <div className="flex items-center text-sm">
            <span className="mr-5">Quantity:</span>
            <QuantityField
              value={quantity}
              onChange={handleQuantityChange}
              min={0}
              max={10}
              disabled={isPending}
            />
            <button
              type="button"
              className="btn btn-ghost ml-2"
              onClick={() => deleteCartItem(cartItemId)}
            >
              <TrashIcon className="h-5 w-5 text-primary" />
            </button>
          </div>
          <span className="text-sm">€{(price * quantity).toFixed(2)}</span>
        </div>

        {isPending && (
          <div className="absolute bottom-0 m-2 mt-2 text-sm text-info">
            Pending...
          </div>
        )}

        <Message
          message={successMessage}
          type="success"
          className="absolute bottom-0 m-2"
        />
        <Message
          message={errorMessage}
          type="error"
          className="absolute bottom-0 m-2"
        />
        <Message
          message={errorFields ? Object.values(errorFields)[0] : null}
          type="error"
          className="absolute bottom-0 m-2"
        />
      </div>
    </li>
  );
};
