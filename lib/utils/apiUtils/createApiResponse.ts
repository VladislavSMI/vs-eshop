import { ZodError } from 'zod';
import { ApiResponse, TranslationKey } from '@/lib/types';
import { PublicError } from '@/lib/errors/PublicError';
import { UnexpectedError } from '@/lib/errors/UnexpectedError';

export const createValidationErrorResponse = (
  error: ZodError,
): ApiResponse<null> => ({
  status: 'error',
  details: {
    code: 'VALIDATION_ERROR',
    fields: Object.fromEntries(
      Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
        key,
        value ? (value as TranslationKey[]) : [],
      ]),
    ),
    messageKey: 'responseError.validation.general.invalid',
  },
});

export const createPublicErrorResponse = (
  error: PublicError,
): ApiResponse<null> => ({
  status: 'error',
  details: {
    code: error.code,
    messageKey: error.messageKey,
  },
});

export const createSuccessResponse = <T>({
  code,
  messageKey,
  data,
}: {
  code: string;
  messageKey: TranslationKey;
  data?: T;
}): ApiResponse<T> => ({
  status: 'success',
  data,
  details: {
    code,
    messageKey,
  },
});

export const createValidationMessage = (key: TranslationKey): TranslationKey =>
  key;

export function createErrorResponse(err: unknown) {
  if (err instanceof PublicError) {
    return createPublicErrorResponse(err);
  }

  return createPublicErrorResponse(new UnexpectedError());
}
