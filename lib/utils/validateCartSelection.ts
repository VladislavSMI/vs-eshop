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

  const { quantity } = cartItemSelection;

  if (quantity === null) {
    errors.quantity = translate('responseError.validation.quantity.required');
  } else if (quantity < 0 || quantity > 100) {
    errors.quantity = translate('responseError.validation.quantity.invalid');
  }

  if (Object.keys(errors).length > 0) {
    setErrorFields(errors);
    return false;
  }

  setErrorFields(null);
  return true;
}
