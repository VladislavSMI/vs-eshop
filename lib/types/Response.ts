import { TranslationKey } from '@/i18n/TranslationKeys';

export type Response = {
  code: string;
  messageKey: TranslationKey;
  fields?: Record<string, TranslationKey[]>;
};

export type ApiResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  details: Response;
};
