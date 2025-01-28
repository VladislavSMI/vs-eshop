import { ReactNode } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export const UnexpectedError = ({
  message,
  mailto,
  contactSupport,
  returnHome,
  children,
}: {
  message: string;
  mailto: string;
  contactSupport: string;
  returnHome: string;
  children?: ReactNode;
}) => (
  <div className="m-10 mt-20 flex justify-center">
    <div className="card w-full rounded-lg border-2 border-error bg-base-100 p-10 text-center shadow-lg">
      <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold text-error">
        <ExclamationTriangleIcon className="h-6 w-6 text-error" />
        Error
      </h1>
      <p className="mt-4 text-lg text-secondary-content">{message}</p>

      {children && (
        <div className="text-md mt-4 text-secondary-content">{children}</div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href={mailto}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {contactSupport}
        </Link>
        <Link href="/" className="btn btn-outline">
          {returnHome}
        </Link>
      </div>
    </div>
  </div>
);
