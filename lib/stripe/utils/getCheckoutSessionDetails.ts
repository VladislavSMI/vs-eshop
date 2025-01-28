import { log } from '@/lib/logging/log';
import { stripeServer } from '../stripeServer';

export const getCheckoutSessionDetails = async (sessionId: string) => {
  try {
    const session = await stripeServer.checkout.sessions.retrieve(sessionId);

    return session;
  } catch (error) {
    log.error('Error in retrieving checkout session details from Stripe');
    throw error;
  }
};
