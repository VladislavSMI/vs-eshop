'use server';

import {
  createCart,
  deleteCartItemById,
  getCartById,
  upsertItemToCart,
  validateStock,
} from '@/data/repository/CartRepository';
import { Cart, CartItem } from '@/lib/types';
import { PublicError } from './errors';
import { getCartIdFromCookies, setCartIdInCookies } from '@/lib/utils/cookies';

export async function createCartUseCase(): Promise<Cart> {
  const cart = await createCart();
  setCartIdInCookies(cart.id);
  return cart;
}

export async function fetchCartUseCase(): Promise<Cart | null> {
  const cartId = getCartIdFromCookies();
  if (!cartId) return null;
  return getCartById(cartId);
}

export async function updateCartItemUseCase({
  cartId,
  productId,
  sizeId,
  quantity,
  isQtyIncremented,
}: {
  cartId: string;
  productId: string;
  sizeId: number;
  quantity: number;
  isQtyIncremented: boolean;
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

  return await upsertItemToCart({
    cartId,
    productId,
    sizeId,
    quantity,
    isQtyIncremented,
  });
}

export async function deleteCartItemUseCase(
  cartItemId: CartItem['cartItemId'],
): Promise<boolean> {
  return await deleteCartItemById(cartItemId);
}
