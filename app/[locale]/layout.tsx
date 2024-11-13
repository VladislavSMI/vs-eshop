import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale, routing } from '@/i18n/routing';
import BaseLayout from '@/components/layout/BaseLayout';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'pages.home' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        { rel: 'icon', url: '/favicon/favicon.ico' },
        { rel: 'icon', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
      ],
      apple: '/favicon/apple-touch-icon.png',
      android: '/favicon/android-chrome-192x192.png',
      androidLarge: '/favicon/android-chrome-512x512.png',
    },
    manifest: '/favicon/site.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
