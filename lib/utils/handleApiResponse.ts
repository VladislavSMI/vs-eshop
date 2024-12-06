import { Dispatch, SetStateAction } from 'react';
import { handleFieldErrors } from '@/lib/utils/handleFieldErrors';
import { ApiResponse, TranslationKey } from '@/lib//types';

export function handleApiResponse({
  response,
  translate,
  setSuccessMessage,
  setErrorMessage,
  setErrorFields,
}: {
  response: ApiResponse<null>;
  translate: (key: TranslationKey) => string;
  setSuccessMessage: Dispatch<SetStateAction<string | null>>;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  setErrorFields: Dispatch<SetStateAction<Record<string, string> | null>>;
}) {
  const { status, details } = response;

  if (status === 'success') {
    setSuccessMessage(translate(details.messageKey));
    return;
  }

  if (details?.fields) {
    setErrorFields(handleFieldErrors({ fields: details.fields, translate }));
    return;
  }

  setErrorMessage(translate(details.messageKey));
}
