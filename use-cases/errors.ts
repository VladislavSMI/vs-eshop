import { TranslationKey } from '@/lib/types';

interface PublicErrorOptions {
  code: string;
  message: string;
  messageKey: TranslationKey;
}

export class PublicError extends Error {
  code: string;
  messageKey: TranslationKey;

  constructor({ code, message, messageKey }: PublicErrorOptions) {
    super(message);
    this.code = code;
    this.messageKey = messageKey;
    this.name = 'PublicError';
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super({
      code: 'NOT_FOUND',
      message: 'The requested resource could not be found.',
      messageKey: 'responseError.notFound',
    });
    this.name = 'NotFoundError';
  }
}

export class UnexpectedError extends PublicError {
  constructor() {
    super({
      code: 'UNEXPECTED_ERROR',
      message: 'An unexpected error occurred.',
      messageKey: 'responseError.unexpected',
    });
    this.name = 'UnexpectedError';
  }
}
