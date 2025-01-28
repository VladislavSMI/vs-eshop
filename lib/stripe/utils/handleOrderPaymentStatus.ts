import {
  getOrderById,
  updateOrderState,
} from '@/data/repository/OrderRepository';
import pino from 'pino';
import Stripe from 'stripe';

export async function handlePaymentStatus({
  orderId,
  paymentStatus,
  logger,
}: {
  orderId: string;
  paymentStatus: Stripe.Checkout.Session.PaymentStatus;
  logger: pino.Logger;
}): Promise<{ orderId: string; paymentStatus: 'success' | 'failed' }> {
  switch (paymentStatus) {
    case 'paid':
    case 'no_payment_required': {
      await updateOrderState({ orderId, state: 'paid' });
      logger.info(`Order ${orderId} successfully marked as paid.`);

      const order = await getOrderById(orderId);
      if (order?.isPaid) {
        return { orderId, paymentStatus: 'success' };
      }

      return { orderId, paymentStatus: 'success' };
    }

    case 'unpaid':
      logger.warn(`Order ${orderId} has payment status "${paymentStatus}".`);
      return { orderId, paymentStatus: 'failed' };

    default:
      logger.warn(
        `Unhandled payment status "${paymentStatus}" for order ${orderId}.`,
      );
      return { orderId, paymentStatus: 'failed' };
  }
}
