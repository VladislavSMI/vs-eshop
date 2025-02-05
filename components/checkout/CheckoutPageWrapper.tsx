import React from 'react';
import { getTranslations } from 'next-intl/server';
import { processOrderPayment } from '@/lib/stripe/utils/processOrderPayment';
import { UnexpectedPaymentError } from '@/components/checkout/UnexpectedPaymentError';
import { log } from '@/lib/logging/log';
import { PaymentStatus, TranslationKey } from '@/lib/types';
import { cancelOrderUseCase } from '@/use-cases/order';

export default async function CheckoutPageWrapper({
  searchParams,
  expectedPaymentStatus,
  children,
}: {
  searchParams: Record<string, string>;
  expectedPaymentStatus: PaymentStatus;
  children: (props: { t: (key: TranslationKey) => string }) => JSX.Element;
}) {
  const t = await getTranslations();

  const { session_id: sessionId } = searchParams;

  if (!sessionId) {
    log.error('Missing session_id in searchParams.');
    return (
      <UnexpectedPaymentError
        message={t('pages.checkout.unexpectedError')}
        contactSupport={t('pages.checkout.contactSupport')}
        returnHome={t('pages.checkout.cancel.returnHome')}
      />
    );
  }

  const { orderId, paymentStatus } = await processOrderPayment(sessionId);

  if (paymentStatus === 'failed' && orderId) {
    await cancelOrderUseCase(orderId);
  }

  if (paymentStatus !== expectedPaymentStatus) {
    log
      .child({ orderId, paymentStatus })
      .error(`Unexpected payment status: ${paymentStatus}`);

    return (
      <UnexpectedPaymentError
        orderId={orderId}
        sessionId={sessionId}
        message={t('pages.checkout.unexpectedError')}
        contactSupport={t('pages.checkout.contactSupport')}
        returnHome={t('pages.checkout.cancel.returnHome')}
      />
    );
  }

  return <>{children({ t })}</>;
}
