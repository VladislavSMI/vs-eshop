import { loadStripe } from '@stripe/stripe-js';
import { log } from '../logging/log';

export const getStripeClient = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    log.fatal(
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing. Ensure it is set.',
    );
    return null;
  }

  return loadStripe(publishableKey);
};
