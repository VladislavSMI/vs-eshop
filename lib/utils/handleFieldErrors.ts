import { TranslationKey } from '../types';

export function handleFieldErrors({
  fields,
  translate,
}: {
  fields: Record<string, TranslationKey[]>;
  translate: (key: TranslationKey) => string;
}): Record<string, string> | null {
  if (!fields) return null;

  return Object.fromEntries(
    Object.entries(fields).map(([field, errorKeys]) => [
      field,
      errorKeys?.[0]
        ? translate(errorKeys[0])
        : translate('responseError.validation.general.invalidType'),
    ]),
  );
}
