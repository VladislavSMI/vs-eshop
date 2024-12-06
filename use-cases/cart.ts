'use server';

import {
  addItemToCart,
  createCart,
  getCartById,
  validateStock,
} from '@/data/repository/CartRepository';
import { Cart } from '@/lib/types';
import { PublicError } from './errors';

export async function getCartByIdUseCase(id: string): Promise<Cart | null> {
  return await getCartById(id);
}

export async function createCartUseCase(): Promise<Cart> {
  return await createCart();
}

export async function addItemToCartUseCase({
  cartId,
  productId,
  sizeId,
  quantity,
}: {
  cartId: string;
  productId: string;
  sizeId: number;
  quantity: number;
}): Promise<boolean> {
  const isStockValid = await validateStock({
    productId,
    sizeId,
    quantity,
    cartId,
  });

  if (!isStockValid) {
    throw new PublicError({
      code: 'ITEM_OUT_OF_STOCK',
      message:
        'The selected product is no longer available in the requested quantity.',
      messageKey: 'responseError.outOfStock',
    });
  }

  return await addItemToCart({ cartId, productId, sizeId, quantity });
}
