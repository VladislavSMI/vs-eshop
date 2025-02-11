'use server';

import {
  cancelOrderWithItems,
  createOrderWithItems,
} from '@/data/repository/OrderRepository';
import { Address, Cart, Order } from '@/lib/types';
import { log } from '@/lib/logging/log';
import { PublicError } from './errors';
import { printException } from '@/lib/utils/utils';

export async function createOrderUseCase({
  cartId,
  shippingAddressId,
}: {
  cartId: Cart['id'];
  shippingAddressId: Address['id'];
}): Promise<Order> {
  try {
    return await createOrderWithItems({ cartId, shippingAddressId });
  } catch (err) {
    log.error(
      { cartId, shippingAddressId, err: printException(err) },
      'Error occurred during order creation',
    );

    if (err instanceof PublicError) {
      throw err;
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
  } catch (err) {
    log.error(
      { orderId, error: printException(err) },
      'Error while cancelling order',
    );

    if (err instanceof PublicError) {
      throw err;
    }

    throw new PublicError({
      code: 'ORDER_CANCELLATION_ERROR',
      message: 'An unexpected error occurred while cancelling the order.',
      messageKey: 'responseError.unexpected',
    });
  }
}
