'use server';

import { revalidatePath } from 'next/cache';
import {
  updateCartItemUseCase,
  createCartUseCase,
  deleteCartItemUseCase,
} from '@/use-cases/cart';
import { getCartIdFromCookies } from '@/lib/utils/cookies';
import { log } from '@/lib/logging/log';
import {
  DeleteItemSchema,
  UpdateItemSchema,
} from '../validation/schemas/cartSchema';
import { ApiResponse, CartItem, CartItemSelection } from '../types';
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createErrorResponse,
} from '../utils/apiUtils/createApiResponse';

export async function updateCartItem({
  cartItemSelection: { productId, sizeId, quantity },
  isQtyIncremented,
}: {
  cartItemSelection: CartItemSelection;
  isQtyIncremented: boolean;
}): Promise<ApiResponse<null>> {
  const { success, error, data } = UpdateItemSchema.safeParse({
    productId,
    sizeId,
    quantity,
    isQtyIncremented,
  });

  if (!success) {
    return createValidationErrorResponse(error);
  }

  const cartIdFromCookies = getCartIdFromCookies();
  const cartId = cartIdFromCookies ?? (await createCartUseCase()).id;

  try {
    await updateCartItemUseCase({
      cartId,
      productId: data.productId,
      sizeId: data.sizeId,
      quantity: data.quantity,
      isQtyIncremented: data.isQtyIncremented,
    });

    revalidatePath('/cart');

    return createSuccessResponse({
      code: 'CART_ITEM_UPDATED',
      messageKey: 'responseSuccess.updateCart',
    });
  } catch (err) {
    log.error(
      { cartItem: { cartId, productId, sizeId, quantity }, err },
      'Error occurred during update item in cart',
    );

    return createErrorResponse(err);
  }
}

export async function deleteCartItem(
  cartItemId: CartItem['cartItemId'],
): Promise<ApiResponse<null>> {
  const { success, error, data } = DeleteItemSchema.safeParse({
    cartItemId,
  });

  if (!success) {
    return createValidationErrorResponse(error);
  }

  try {
    await deleteCartItemUseCase(data.cartItemId);

    revalidatePath('/cart');

    return createSuccessResponse({
      code: 'CART_ITEM_DELETED',
      messageKey: 'responseSuccess.deleteCartItem',
    });
  } catch (err) {
    log.error({ cartItemId, err }, 'Error occurred during delete item in cart');

    return createErrorResponse(err);
  }
}
