import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { ReactQueryProvider } from '@/lib/hooks/useReactQueryProvider';
import { poppins } from '@/styles/fonts';
import { Locale } from '@/lib/types';
import '@/styles/globals.css';

import { Footer } from './footer/Footer';
import { Navbar } from './navbar/Navbar';

type Props = {
  children: ReactNode;
  locale: Locale;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="vsShopDark" className="h-full">
      <body
        className={clsx(
          poppins.className,
          'antialiased',
          'flex h-full flex-col',
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <ReactQueryProvider>
            <main className="flex-grow">{children}</main>
          </ReactQueryProvider>
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}
