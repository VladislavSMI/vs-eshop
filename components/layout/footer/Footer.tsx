import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="flex flex-col items-center bg-base-200 p-5 text-base-content">
      <nav className="mb-5 grid grid-flow-col gap-10">
        <Link href="/about-us" className="link-hover link text-sm md:text-lg">
          {t('aboutUs')}
        </Link>
        <Link
          href="/terms-conditions"
          className="link-hover link text-sm md:text-lg"
        >
          {t('termsConditions')}
        </Link>
        <Link
          href="/shipping-return-policy"
          className="link-hover link text-sm md:text-lg"
        >
          {t('shippingReturnPolicy')}
        </Link>
        <Link
          href="/privacy-policy"
          className="textlg link-hover text-sm md:text-lg"
        >
          {t('privacyPolicy')}
        </Link>
      </nav>

      <nav className="mb-5 grid grid-flow-col gap-8">
        <a
          href="https://x.com/smihula_"
          target="_blank"
          rel="noreferrer"
          aria-label="X"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M23.5 0H16L12 8L8 0H0.5L9.5 15L0.5 24H8L12 16L16 24H23.5L14.5 15L23.5 0Z" />
          </svg>
        </a>

        <a
          href="mailto:vladislav.smihula@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/vladislav-%C5%A1mihula-9302b840/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-10.32 19.14h-2.69v-8.64h2.69v8.64zm-1.34-9.78c-.91 0-1.64-.75-1.64-1.66s.74-1.66 1.64-1.66c.91 0 1.65.75 1.65 1.66s-.75 1.66-1.65 1.66zm11.66 9.78h-2.68v-4.53c0-1.08-.02-2.46-1.49-2.46-1.49 0-1.72 1.16-1.72 2.37v4.62h-2.69v-8.64h2.58v1.18h.04c.36-.69 1.24-1.41 2.55-1.41 2.73 0 3.23 1.8 3.23 4.14v4.73z" />
          </svg>
        </a>

        <a
          href="https://github.com/VladislavSMI"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M12 .5C5.85.5.5 5.85.5 12.3c0 5.22 3.44 9.64 8.2 11.22.6.1.8-.26.8-.58v-2.02c-3.34.74-4.03-1.58-4.03-1.58-.54-1.36-1.34-1.7-1.34-1.7-1.1-.74.08-.72.08-.72 1.2.08 1.84 1.26 1.84 1.26 1.08 1.86 2.88 1.32 3.58 1 .1-.8.42-1.32.76-1.62-2.67-.3-5.48-1.34-5.48-5.96 0-1.3.48-2.38 1.26-3.22-.14-.3-.54-1.54.12-3.22 0 0 1.02-.32 3.34 1.24A11.65 11.65 0 0112 7.98c1.08.02 2.16.14 3.16.4 2.3-1.58 3.32-1.24 3.32-1.24.68 1.68.28 2.92.14 3.22.8.84 1.26 1.92 1.26 3.22 0 4.64-2.82 5.66-5.5 5.96.44.38.84 1.12.84 2.26v3.34c0 .34.22.7.82.58 4.76-1.58 8.2-6 8.2-11.22C23.5 5.85 18.15.5 12 .5z" />
          </svg>
        </a>
      </nav>

      <aside>
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} - {t('allRightsReserved')}
        </p>
      </aside>
    </footer>
  );
};
