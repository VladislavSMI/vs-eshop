import { Order } from '@/lib/types';
import { stripeServer } from '../stripeServer';
import { createStripeCheckoutOrderParams } from './createStripeCheckoutOrderParams';

export const createOrderCheckoutSession = async (order: Order) => {
  const stripeCheckoutOrderParams =
    await createStripeCheckoutOrderParams(order);

  return stripeServer.checkout.sessions.create(stripeCheckoutOrderParams);
};
