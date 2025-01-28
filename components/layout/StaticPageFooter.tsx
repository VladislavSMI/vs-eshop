import React from 'react';
import { useTranslations } from 'next-intl';

interface StaticPageProps {
  translationKey:
    | 'pages.aboutUs'
    | 'pages.privacyPolicy'
    | 'pages.shippingReturnPolicy'
    | 'pages.termsConditions';
}

export const StaticPageFooter = ({ translationKey }: StaticPageProps) => {
  const t = useTranslations(translationKey);

  return (
    <div className="mt-10 text-center">
      <h1 className="text-4xl">{t('title')}</h1>
      <p className="m-10 text-justify md:text-lg">{t('text')}</p>
    </div>
  );
};
