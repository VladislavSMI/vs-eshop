import { Order } from '@/lib/types';
import Stripe from 'stripe';

export const createStripeCheckoutOrderParams = async (order: Order) => {
  const lineItems = order.items.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.productName,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const stripeCheckout: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      orderId: order.id,
      cartId: order.cartId,
    },
  };

  return stripeCheckout;
};
