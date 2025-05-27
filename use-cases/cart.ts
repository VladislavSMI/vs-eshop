'use server';

import {
  createCart,
  deleteCartItemById,
  getCartById,
  upsertItemToCart,
  validateStock,
} from '@/data/repository/CartRepository';
import { Cart, CartItem } from '@/lib/types';
import { getCartIdFromCookies, setCartIdInCookies } from '@/lib/utils/cookies';
import { PublicError } from '@/lib/errors/PublicError';

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
  // The cart ID from cookies may be invalid (e.g. after DB reset or expiry).
  const isExistingCart = await getCartById(cartId);

  const validatedCartId = isExistingCart ? cartId : (await createCart()).id;

  if (!isExistingCart) {
    setCartIdInCookies(validatedCartId);
  }

  const isStockValid = await validateStock({
    productId,
    sizeId,
    quantity,
    cartId: validatedCartId,
    isQtyIncremented,
  });

  if (!isStockValid) {
    throw new PublicError({
      code: 'ITEM_OUT_OF_STOCK',
      message:
        'The selected product is no longer available in the requested quantity.',
      messageKey: 'responseError.outOfStock',
    });
  }

  return upsertItemToCart({
    cartId: validatedCartId,
    productId,
    sizeId,
    quantity,
    isQtyIncremented,
  });
}

export async function deleteCartItemUseCase(
  cartItemId: CartItem['cartItemId'],
): Promise<boolean> {
  return deleteCartItemById(cartItemId);
}
