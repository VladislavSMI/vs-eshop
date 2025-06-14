import { Order } from '@/lib/types';
import { stripeServer } from '../stripeServer';
import { createStripeCheckoutOrderParams } from './createStripeCheckoutOrderParams';

export interface CheckoutSession {
  id: string;
}

export const createOrderCheckoutSession = async (
  order: Order,
): Promise<CheckoutSession> => {
  const stripeCheckoutOrderParams =
    await createStripeCheckoutOrderParams(order);

  const session = await stripeServer.checkout.sessions.create(
    stripeCheckoutOrderParams,
  );

  return { id: session.id };
};
