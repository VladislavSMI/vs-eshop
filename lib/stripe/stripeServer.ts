import Stripe from 'stripe';
import { log } from '../logging/log';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  log.fatal(
    'STRIPE_SECRET_KEY is missing. Ensure the environment variable is set.',
  );
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripeServer = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia',
});
