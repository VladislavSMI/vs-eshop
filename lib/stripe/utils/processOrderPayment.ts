'use server';

import { log } from '@/lib/logging/log';
import { savePaymentLog } from '@/data/repository/PaymentLogRepository';
import { savePayment } from '@/data/repository/PaymentRepository';
import { PaymentStatus } from '@/lib/types';
import { getCheckoutSessionDetails } from './getCheckoutSessionDetails';
import { toPaymentStatus } from './toPaymentStatus';
import { handlePaymentStatus } from './handleOrderPaymentStatus';

export const processOrderPayment = async (
  stripeSessionId: string,
): Promise<{ orderId: string | null; paymentStatus: PaymentStatus }> => {
  const logger = log.child({ stripeSessionId });

  try {
    // 1) Retrieve session data from Stripe
    const session = await getCheckoutSessionDetails(stripeSessionId);
    if (!session) {
      logger.error('No Stripe session found for this ID.');
      return { orderId: null, paymentStatus: 'failed' };
    }

    // 2) Log the session details in payment_logs
    const {
      payment_status: paymentStatus,
      metadata,
      amount_total: amountTotal,
    } = session;
    await savePaymentLog({
      externalPaymentId: stripeSessionId,
      status: paymentStatus,
      type: 'order',
      message: JSON.stringify(session),
    });

    // 3) Get the orderId from session metadata
    const orderId = metadata?.orderId ?? null;
    if (!orderId) {
      logger.error('Session metadata missing "orderId".');
      return { orderId, paymentStatus: 'failed' };
    }

    // 4) Save or update the payment record in the payments table
    const extendedLogger = logger.child({ orderId, paymentStatus });
    const savedPayment = await savePayment({
      orderId,
      externalPaymentId: stripeSessionId,
      status: toPaymentStatus(paymentStatus),
      amount: (amountTotal ?? 0) / 100,
    });

    if (!savedPayment) {
      extendedLogger.error('Failed to save payment in DB.');
      return { orderId, paymentStatus: 'failed' };
    }

    // 5) Handle different payment statuses
    return await handlePaymentStatus({
      orderId,
      paymentStatus,
      logger: extendedLogger,
    });
  } catch (error) {
    logger.error(
      { error },
      'An unexpected error occurred during payment processing.',
    );
    return { orderId: null, paymentStatus: 'failed' };
  }
};
