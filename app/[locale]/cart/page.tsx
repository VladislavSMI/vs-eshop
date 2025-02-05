import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { fetchCartUseCase } from '@/use-cases/cart';
import { CheckoutCartItem } from '@/components/cart/CheckoutCartItem';

export default async function Checkout() {
  const cart = await fetchCartUseCase();
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-neutral text-neutral-content">
      <div className="container mx-auto max-w-4xl px-5 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">
            {t('pages.checkout.title')}
          </h1>
          <p className="mt-4 text-lg text-secondary-content">
            {t('pages.checkout.description')}
          </p>
        </div>

        <div className="card bg-base-100 p-5 shadow-md">
          <h2 className="text-2xl font-bold text-primary">
            {t('components.cart.myCart')}
          </h2>
          {cart?.items?.length ? (
            <>
              <ul className="mt-4">
                {cart.items.map((item) => (
                  <CheckoutCartItem key={item.cartItemId} cartItem={item} />
                ))}
              </ul>
              <div className="mt-6 pt-4">
                <p className="flex justify-between text-lg font-semibold">
                  <span>{t('components.cart.totalQuantity')}</span>
                  <span>{cart?.totalQty}</span>
                </p>
                <p className="flex justify-between text-lg font-semibold">
                  <span>{t('components.cart.totalPrice')}</span>
                  <span>€{cart?.totalPrice.toFixed(2)}</span>
                </p>
              </div>
              <div className="mt-6 text-center">
                <Link href="/checkout" className="btn btn-primary w-full">
                  {t('components.cart.checkoutNow')}
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-4 text-center text-lg">
              {t('components.cart.emptyCartMessage')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
