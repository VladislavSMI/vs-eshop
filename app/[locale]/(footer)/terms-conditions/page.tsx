import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { StaticPageFooter } from '@/components/layout/StaticPageFooter';
import { PageProps } from '@/lib/types';

export default function TermsConditions({ params: { locale } }: PageProps) {
  setRequestLocale(locale);

  return <StaticPageFooter translationKey="pages.termsConditions" />;
}
