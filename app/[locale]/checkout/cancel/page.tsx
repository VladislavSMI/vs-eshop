import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import CheckoutPageWrapper from '@/components/checkout/CheckoutPageWrapper';

export default async function CancelPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <CheckoutPageWrapper
      searchParams={searchParams}
      expectedPaymentStatus="failed"
    >
      {({ t }) => (
        <div className="m-10 mt-20 flex justify-center">
          <div className="card max-w-xl rounded-lg border-2 border-error bg-base-100 p-10 text-center shadow-lg">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold text-error">
              <ExclamationTriangleIcon className="h-6 w-6 text-error" />
              {t('pages.checkout.cancel.title')}
            </h1>
            <p className="mt-4 text-lg text-secondary-content">
              {t('pages.checkout.cancel.description')}
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/cart" className="btn btn-primary">
                {t('pages.checkout.cancel.tryAgain')}
              </Link>
              <Link href="/" className="btn btn-outline">
                {t('pages.checkout.cancel.returnHome')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </CheckoutPageWrapper>
  );
}
