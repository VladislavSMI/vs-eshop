'use server';

import { log } from '@/lib/logging/log';
import { findOrCreateShippingAddressUseCase } from '@/use-cases/address';
import { cancelOrderUseCase, createOrderUseCase } from '@/use-cases/order';
import { Address, ApiResponse, Order } from '../types';
import { createOrderCheckoutSession } from '../stripe/utils/createOrderCheckoutSession';
import { ShippingAddressSchema } from '../validation/schemas/shippingAddressSchema';
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createErrorResponse,
} from '../utils/apiUtils/createApiResponse';
import { printException } from '../utils/utils';

export async function createOrder(
  cartId: string,
  formData: FormData,
): Promise<ApiResponse<{ order: Order } | null>> {
  const rowFormData = Object.fromEntries(formData.entries());
  log.info({ cartId, rowFormData }, 'Creating order initiated');

  const shippingAddress = {
    ...rowFormData,
    countryId: Number(rowFormData.countryId),
  };

  const { success, error, data } =
    ShippingAddressSchema.safeParse(shippingAddress);

  if (!success) {
    return createValidationErrorResponse(error);
  }

  try {
    const { id } = await findOrCreateShippingAddressUseCase(data as Address);

    const order = await createOrderUseCase({
      cartId,
      shippingAddressId: id,
    });

    return createSuccessResponse({
      code: 'ORDER_CREATED',
      messageKey: 'responseSuccess.orderSuccess',
      data: { order },
    });
  } catch (err) {
    return createErrorResponse(err);
  }
}

export async function createOrderAndCheckoutSession(
  cartId: string,
  formData: FormData,
): Promise<ApiResponse<{ checkoutSessionId: string } | null>> {
  // Step 1: Create the order
  const orderResponse = await createOrder(cartId, formData);
  const { status, data } = orderResponse;
  const order = data?.order;

  if (status !== 'success' || !order) {
    return orderResponse as ApiResponse<null>;
  }

  try {
    // Step 2: Create Checkout session and get session ID
    const { id } = await createOrderCheckoutSession(order);

    log.info({ id }, 'Successfully created order and checkout session');

    return createSuccessResponse({
      code: 'ORDER_AND_SESSION_CREATED',
      messageKey: 'responseSuccess.checkoutSuccess',
      data: { checkoutSessionId: id },
    });
  } catch (err) {
    log.error(
      { error: printException(err) },
      'Error creating checkout session',
    );

    // Step 3: Cancel order if checkout session creation fails
    await cancelOrderUseCase(order.id).catch((cancelErr) => {
      log.error(
        { orderId: order.id, cancelErr },
        'Failed to cancel order after checkout session creation failure',
      );
    });

    return createErrorResponse(err);
  }
}
