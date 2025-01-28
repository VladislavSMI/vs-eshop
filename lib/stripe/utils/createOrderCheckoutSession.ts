import { stripeServer } from '../stripeServer';
import { createStripeCheckoutOrderParams } from './createStripeCheckoutOrderParams';
import { Order } from '@/lib/types';

export const createOrderCheckoutSession = async (order: Order) => {
  const stripeCheckoutOrderParams =
    await createStripeCheckoutOrderParams(order);

  return stripeServer.checkout.sessions.create(stripeCheckoutOrderParams);
};
