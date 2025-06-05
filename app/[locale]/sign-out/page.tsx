import React from 'react';
import { getTranslations } from 'next-intl/server';

export default async function LogoutPage() {
  const t = await getTranslations('pages.signOut');
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-5 text-center text-4xl font-bold text-primary">
        {t('title')}
      </h1>
      <p>{t('description')}</p>
    </div>
  );
}
