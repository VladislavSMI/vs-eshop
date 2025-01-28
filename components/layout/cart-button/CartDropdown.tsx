import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { Cart } from '@/lib/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const CartDropdown = ({ cart }: { cart: Cart | null }) => {
  const isCartEmpty = !cart || cart.items.length === 0;
  const t = useTranslations('components.cart');

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} type="button" className="btn btn-circle btn-ghost">
        <div className="indicator">
          <ShoppingCartIcon className="h-6 w-6 text-primary" />
          {!isCartEmpty && (
            <span className="badge indicator-item badge-primary badge-sm">
              {cart?.totalQty}
            </span>
          )}
        </div>
      </button>

      <div
        className="card dropdown-content card-compact mt-2 w-64 bg-neutral p-2 text-secondary-content shadow-lg"
        role="menu"
        aria-hidden={isCartEmpty ? 'true' : 'false'}
      >
        <div className="card-body">
          <h2 className="card-title">{t('myCart')}</h2>
          {!isCartEmpty ? (
            <>
              <ul className="space-y-2">
                {cart?.items.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">{item.productName}</span>
                      <span className="mt-5 text-sm">
                        {t('size')}: {item.size}
                      </span>
                      <div className="flex justify-between">
                        <span className="text-sm">
                          {t('quantity')}: {item.quantity}
                        </span>
                        <span className="text-sm">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-primary pt-2">
                <p className="flex justify-between text-sm">
                  <span>{t('quantity')}</span>
                  <span>{cart?.totalQty}</span>
                </p>
                <p className="flex justify-between text-sm">
                  <span>{t('total')}</span>
                  <span>{cart?.totalPrice.toFixed(2)}</span>
                </p>
              </div>
              <Link href="/cart" className="btn btn-primary btn-sm mt-2 w-full">
                {t('goToCart')}
              </Link>
            </>
          ) : (
            <p className="text-center text-sm">{t('emptyCart')}</p>
          )}
        </div>
      </div>
    </div>
  );
};
