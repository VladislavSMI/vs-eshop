import React from 'react';
import { useTranslations } from 'next-intl';
import { TranslationKey } from '@/lib/types';

export const LocalizedSectionHeader = ({
  translationKey,
}: {
  translationKey: TranslationKey;
}) => {
  const t = useTranslations();

  return (
    <div className="mb-14 mt-14 text-center text-2xl">
      <h1 className="m-5 capitalize">{t(translationKey)}</h1>
    </div>
  );
};
