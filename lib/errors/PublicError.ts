import { TranslationKey } from '@/lib/types';

interface PublicErrorOptions {
  code: string;
  message: string;
  messageKey: TranslationKey;
}

export class PublicError extends Error {
  messageKey: TranslationKey;

  code: string;

  constructor({ code, message, messageKey }: PublicErrorOptions) {
    super(message);
    this.code = code;
    this.messageKey = messageKey;
    this.name = 'PublicError';
  }
}
