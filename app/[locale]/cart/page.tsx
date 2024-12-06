import React from 'react';
import { getCartIdFromCookies } from '@/lib/utils/cookies';
import { getCartByIdUseCase } from '@/use-cases/cart';
import { getTranslations } from 'next-intl/server';

const fetchCart = async () => {
  const cartId = getCartIdFromCookies();

  if (!cartId) {
    return null;
  }

  return getCartByIdUseCase(cartId);
};

export default async function Checkout() {
  const cart = await fetchCart();
  const t = await getTranslations();
  const isCartEmpty = !cart || cart.items.length === 0;

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
          {!isCartEmpty ? (
            <>
              <ul className="mt-4 space-y-4">
                {cart?.items.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="flex items-center justify-between border-b border-neutral pb-4"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">{item.productName}</span>
                      <span className="mt-2 text-sm">
                        {t('components.cart.size')}: {item.size}
                      </span>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-sm">
                          {t('components.cart.quantity')}: {item.quantity}
                        </span>
                        <span className="text-sm">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-primary pt-4">
                <p className="flex justify-between text-lg font-semibold">
                  <span>{t('components.cart.totalQuantity')}</span>
                  <span>{cart?.totalQty}</span>
                </p>
                <p className="flex justify-between text-lg font-semibold">
                  <span>{t('components.cart.totalPrice')}</span>
                  <span>€{cart?.totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </>
          ) : (
            <p className="mt-4 text-center text-lg">
              {t('components.cart.emptyCartMessage')}
            </p>
          )}
        </div>

        {!isCartEmpty && (
          <div className="mt-6 text-center">
            <button type="button" className="btn btn-primary w-full max-w-sm">
              {t('components.cart.checkoutNow')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
