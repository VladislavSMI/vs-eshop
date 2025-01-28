'use server';

import { createOrderWithItems } from '@/data/repository/OrderRepository';
import { Address, Cart, Order } from '@/lib/types';
import { log } from '@/lib/logging/log';
import { PublicError } from './errors';

export async function createOrderUseCase({
  cartId,
  shippingAddressId,
}: {
  cartId: Cart['id'];
  shippingAddressId: Address['id'];
}): Promise<Order> {
  try {
    const order = await createOrderWithItems({ cartId, shippingAddressId });

    if (!order) {
      throw new PublicError({
        code: 'ORDER_CREATION_FAILED',
        message: 'Failed to create the order. Please try again later.',
        messageKey: 'responseError.orderFailed',
      });
    }

    return order;
  } catch (err) {
    log.error(
      { cartId, shippingAddressId, err },
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
