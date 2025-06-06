import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import {
  updateCartItem as updateCartItemAction,
  deleteCartItem as deleteCartItemAction,
} from '@/lib/actions/cartActions';
import { resetMessages } from '@/lib/utils/resetMessages';
import { validateCartSelection } from '@/lib/utils/validateCartSelection';
import { handleApiResponse } from '@/lib/utils/apiUtils/handleApiResponse';
import { CartItem, CartItemSelection } from '../types';

export const useCartActions = () => {
  const t = useTranslations();

  const [selectedSizeId, setSelectedSizeId] = useState<
    CartItem['sizeId'] | null
  >(null);
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorFields, setErrorFields] = useState<Record<string, string> | null>(
    null,
  );

  const clearMessages = () => {
    resetMessages(setSuccessMessage, setErrorMessage, setErrorFields);
  };

  const updateCartItem = ({
    cartItemSelection,
    isQtyIncremented,
  }: {
    cartItemSelection: CartItemSelection;
    isQtyIncremented: boolean;
  }): void => {
    clearMessages();

    if (
      !validateCartSelection({
        cartItemSelection,
        translate: t,
        setErrorFields,
      })
    ) {
      return;
    }

    startTransition(async () => {
      const response = await updateCartItemAction({
        cartItemSelection,
        isQtyIncremented,
      });
      handleApiResponse({
        response,
        translate: t,
        setSuccessMessage,
        setErrorMessage,
        setErrorFields,
      });
    });

    setTimeout(clearMessages, 10000);
  };

  const deleteCartItem = (cartItemId: CartItem['cartItemId']): void => {
    clearMessages();
    startTransition(async () => {
      const response = await deleteCartItemAction(cartItemId);
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
    successMessage,
    errorMessage,
    errorFields,
    setSelectedSizeId,
    selectedSizeId,
    updateCartItem,
    deleteCartItem,
  };
};
