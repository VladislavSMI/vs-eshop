'use server';

import { revalidateTag } from 'next/cache';
import { addItemToCartUseCase, createCartUseCase } from '@/use-cases/cart';
import { getCartIdFromCookies, setCartIdInCookies } from '@/lib/utils/cookies';
import { log } from '@/lib/logging/log';
import { AddItemSchema } from '../validation/schemas/cartSchema';
import { ApiResponse } from '../types';
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createErrorResponse,
} from '../utils/createApiResponse';

export async function addItem({
  productId,
  sizeId,
  quantity,
}: {
  productId: string;
  sizeId: number;
  quantity: number;
}): Promise<ApiResponse<null>> {
  const { success, error, data } = AddItemSchema.safeParse({
    productId,
    sizeId,
    quantity,
  });

  if (!success) {
    log.error({ errors: error.errors }, 'Validation error');
    return createValidationErrorResponse(error);
  }

  const cartIdFromCookies = getCartIdFromCookies();
  const cartId = cartIdFromCookies || (await createCartUseCase()).id;

  if (!cartIdFromCookies) {
    setCartIdInCookies(cartId);
  }

  try {
    await addItemToCartUseCase({
      cartId,
      productId: data.productId,
      sizeId: data.sizeId,
      quantity: data.quantity,
    });

    revalidateTag('cart');

    return createSuccessResponse({
      code: 'CART_ITEM_ADDED',
      messageKey: 'responseSuccess.addToCart',
    });
  } catch (err) {
    log.error(
      { cartItem: { cartId, productId, sizeId, quantity }, err },
      'Error occurred during add item to cart',
    );

    return createErrorResponse(err);
  }
}
