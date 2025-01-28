import { PaymentStatus } from 'lib/types';
import Stripe from 'stripe';

export const toPaymentStatus = (
  stripePaymentStatus: Stripe.Checkout.Session.PaymentStatus,
): PaymentStatus => {
  switch (stripePaymentStatus) {
    case 'paid':
    case 'no_payment_required':
      return 'success';

    // TODO: Add logic for 'awaiting_payment' when bank transfers are implemented. Related to issue SK-13
    default:
      return 'failed';
  }
};

export const isUnexpectedPaymentStatus = (
  expected: PaymentStatus,
  actual: PaymentStatus,
): boolean => expected !== actual;
