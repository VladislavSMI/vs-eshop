import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { clsx } from 'clsx';

import { montserrat } from '@/styles/fonts';
import '@/styles/globals.css';

import NavbarWrapper from './navbar/NavbarWrapper';
import Footer from './footer/Footer';

type Props = {
  children: ReactNode;
  locale?: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="luxury" className="h-full">
      <body
        className={clsx(
          montserrat.className,
          'antialiased',
          'flex h-full flex-col',
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavbarWrapper />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
