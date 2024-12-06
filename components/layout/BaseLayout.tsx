import { ReactNode } from 'react';
import { clsx } from 'clsx';

import { poppins } from '@/styles/fonts';
import { Locale } from '@/lib/types';
import '@/styles/globals.css';

import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';

type Props = {
  children: ReactNode;
  locale: Locale;
};

export default async function BaseLayout({ children, locale }: Props) {
  return (
    <html lang={locale} data-theme="vsShopDark" className="h-full">
      <body
        className={clsx(
          poppins.className,
          'antialiased',
          'flex h-full flex-col',
        )}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
