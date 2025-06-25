'use server';

import {
  cancelOrderWithItems,
  createOrderWithItems,
} from '@/data/repository/OrderRepository';
import { Address, Cart, Order } from '@/lib/types';
import { log } from '@/lib/logging/log';
import { printException } from '@/lib/utils/utils';
import { PublicError } from '@/lib/errors/PublicError';

export async function createOrderUseCase({
  cartId,
  shippingAddressId,
}: {
  cartId: Cart['id'];
  shippingAddressId: Address['id'];
}): Promise<Order> {
  try {
    return await createOrderWithItems({ cartId, shippingAddressId });
  } catch (error) {
    log.error(
      { cartId, shippingAddressId, error: printException(error) },
      'Error occurred during order creation',
    );

    if (error instanceof PublicError) {
      throw error;
    }

    throw new PublicError({
      code: 'ORDER_CREATION_ERROR',
      message: 'An unexpected error occurred while creating the order.',
      messageKey: 'responseError.orderFailed',
    });
  }
}

export async function cancelOrderUseCase(orderId: string): Promise<boolean> {
  try {
    return await cancelOrderWithItems(orderId);
  } catch (error) {
    log.error(
      { orderId, error: printException(error) },
      'Error while cancelling order',
    );

    if (error instanceof PublicError) {
      throw error;
    }

    throw new PublicError({
      code: 'ORDER_CANCELLATION_ERROR',
      message: 'An unexpected error occurred while cancelling the order.',
      messageKey: 'responseError.unexpected',
    });
  }
}
