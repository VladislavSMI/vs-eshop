import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LinkWrapperProps {
  href: string;
  useLink?: boolean;
  children: ReactNode;
  className?: string;
}

export const LinkWrapper = ({
  href,
  useLink = true,
  children,
  className,
}: LinkWrapperProps) => {
  if (useLink && href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return children;
};
