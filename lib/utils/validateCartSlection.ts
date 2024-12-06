import { Dispatch, SetStateAction } from 'react';
import { CartSelection, TranslationKey } from '../types';

export function validateCartSelection({
  cartSelection,
  translate,
  setErrorMessage,
}: {
  cartSelection: CartSelection;
  translate: (key: TranslationKey) => string;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
}): boolean {
  if (!cartSelection.sizeId) {
    setErrorMessage(translate('responseError.validation.sizeId.required'));
    return false;
  }

  if (!cartSelection.productId) {
    setErrorMessage(translate('responseError.validation.productId.required'));
    return false;
  }

  return true;
}
