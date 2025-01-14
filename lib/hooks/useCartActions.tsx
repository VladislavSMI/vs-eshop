import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { addItem } from '@/lib/actions/cartActions';
import { resetMessages } from '@/lib/utils/resetMessages';
import { CartSelection, ValidatedCartSelection } from '../types';
import { validateCartSelection } from '../utils/validateCartSlection';
import { handleApiResponse } from '../utils/handleApiResponse';

export const useCartActions = () => {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(
    null,
  );

  const [cartSelection, setCartSelection] = useState<CartSelection>({
    productId: null,
    sizeId: null,
    quantity: 1,
  });

  const t = useTranslations();

  const updateCartSelection = (updates: Partial<CartSelection>) => {
    setCartSelection((prev) => ({ ...prev, ...updates }));
  };

  const addToCart = (): void => {
    resetMessages(setSuccessMessage, setErrorMessage, setErrorFields);

    if (
      !validateCartSelection({
        cartSelection,
        translate: t,
        setErrorMessage,
      })
    ) {
      return;
    }

    startTransition(async () => {
      const response = await addItem(cartSelection as ValidatedCartSelection);

      handleApiResponse({
        response,
        translate: t,
        setSuccessMessage,
        setErrorMessage,
        setErrorFields,
      });
    });
  };

  return {
    isPending,
    cartSelection,
    successMessage,
    errorMessage,
    errorFields,
    updateCartSelection,
    addToCart,
  };
};
