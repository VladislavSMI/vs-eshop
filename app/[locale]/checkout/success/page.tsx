import Link from 'next/link';
import CheckoutPageWrapper from '@/components/checkout/CheckoutPageWrapper';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <CheckoutPageWrapper
      searchParams={searchParams}
      expectedPaymentStatus="success"
    >
      {({ t }) => (
        <div className="m-10 mt-20 flex justify-center">
          <div className="card max-w-xl rounded-lg border-2 border-success bg-base-100 p-10 text-center shadow-lg">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-semibold text-success">
              {t('pages.checkout.success.title')}
            </h1>
            <p className="mt-4 text-lg text-secondary-content">
              {t('pages.checkout.success.description')}
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/" className="btn btn-success">
                {t('pages.checkout.success.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </CheckoutPageWrapper>
  );
}
