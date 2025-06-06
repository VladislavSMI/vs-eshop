import { useState } from 'react';
import { createOrderAndCheckoutSession } from '@/lib/actions/orderActions';
import { ApiResponse } from '@/lib/types';
import { handleApiResponse } from '@/lib/utils/apiUtils/handleApiResponse';
import { getStripeClient } from '@/lib/stripe/stripeClient';
import { useTranslations } from 'next-intl';

export const useCheckoutForm = (cartId: string) => {
  const t = useTranslations();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setErrorFields(null);

    const response: ApiResponse<{ stripeSessionId: string } | null> =
      await createOrderAndCheckoutSession(cartId, formData);

    if (response?.status === 'success' && response.data?.stripeSessionId) {
      const stripe = await getStripeClient();

      setIsSubmitting(false);

      await stripe?.redirectToCheckout({
        sessionId: response.data.stripeSessionId,
      });
    } else {
      handleApiResponse({
        response,
        translate: t,
        setSuccessMessage,
        setErrorMessage,
        setErrorFields,
      });
      setIsSubmitting(false);
    }
  };

  return {
    successMessage,
    errorMessage,
    errorFields,
    isSubmitting,
    handleSubmit,
  };
};
