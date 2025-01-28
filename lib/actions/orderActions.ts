'use server';

import { log } from '@/lib/logging/log';
import { findOrCreateShippingAddressUseCase } from '@/use-cases/address';
import { createOrderUseCase } from '@/use-cases/order';
import { Address, ApiResponse, Order } from '../types';
import { createOrderCheckoutSession } from '../stripe/utils/createOrderCheckoutSession';
import { ShippingAddressSchema } from '../validation/schemas/shippingAddressSchema';
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createErrorResponse,
} from '../utils/createApiResponse';

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
    log.error(
      { errors: error.errors },
      'Validation error during order creation',
    );
    return createValidationErrorResponse(error);
  }

  try {
    const { id } = await findOrCreateShippingAddressUseCase(data as Address);

    if (!id) {
      throw new Error('Shipping address ID is undefined');
    }

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
    log.error(
      { cartId, shippingAddress, err },
      'Error occurred during order creation',
    );

    return createErrorResponse(err);
  }
}

export async function createOrderAndCheckoutSession(
  cartId: string,
  formData: FormData,
): Promise<ApiResponse<{ stripeSessionId: string } | null>> {
  // Step 1: Create the order
  const orderResponse = await createOrder(cartId, formData);
  const { status, data } = orderResponse;
  const order = data?.order;

  if (status !== 'success' || !order) {
    log.error(
      { orderResponse },
      'Failed to create order, skipping Stripe session creation',
    );
    return orderResponse as ApiResponse<null>;
  }

  try {
    // Step 2: Create Stripe Checkout session
    const { id: stripeSessionId } = await createOrderCheckoutSession(order);

    log.info(
      { stripeSessionId },
      'Successfully created order and Stripe checkout session',
    );

    return createSuccessResponse({
      code: 'ORDER_AND_SESSION_CREATED',
      messageKey: 'responseSuccess.checkoutSuccess',
      data: { stripeSessionId },
    });
  } catch (err) {
    log.error({ cartId, err }, 'Error during Stripe session creation');

    return createErrorResponse(err);
  }
}
