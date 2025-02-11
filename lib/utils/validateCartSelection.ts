import { Dispatch, SetStateAction } from 'react';
import { CartItemSelection, TranslationKey } from '../types';

export function validateCartSelection({
  cartItemSelection,
  translate,
  setErrorFields,
}: {
  cartItemSelection: CartItemSelection;
  translate: (key: TranslationKey) => string;
  setErrorFields: Dispatch<SetStateAction<Record<string, string> | null>>;
}): boolean {
  const errors: Record<string, string> = {};

  if (!cartItemSelection.sizeId) {
    errors.sizeId = translate('responseError.validation.sizeId.required');
  }

  if (!cartItemSelection.productId) {
    errors.productId = translate('responseError.validation.productId.required');
  }

  if (cartItemSelection?.quantity !== null && cartItemSelection.quantity < 0) {
    errors.productId = translate('responseError.validation.quantity.invalid');
  }

  if (Object.keys(errors).length > 0) {
    setErrorFields(errors);
    return false;
  }

  setErrorFields(null);
  return true;
}
