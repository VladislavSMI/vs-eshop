import { ReactNode } from 'react';
import '@/styles/globals.css';

type Props = {
  children: ReactNode;
};

// Root layout is required to wrap the localized `not-found.tsx` page for i18n handling, even if it only passes children through

export default function RootLayout({ children }: Props) {
  return children;
}
