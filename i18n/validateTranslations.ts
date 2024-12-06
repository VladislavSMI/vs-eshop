import en from '@/i18n/messages/en.json';
import nl from '@/i18n/messages/nl.json';
import { TranslationKeys } from '@/i18n/TranslationKeys';

// Validate the structure of the translation files via TypeScript types
export const validateTranslationStructure = (
  translations: TranslationKeys,
): TranslationKeys => translations;

validateTranslationStructure(en);
validateTranslationStructure(nl);
