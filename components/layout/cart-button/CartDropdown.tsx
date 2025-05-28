'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { Cart } from '@/lib/types';
import { Dropdown } from '@/components/ui/DropDown';

export const CartDropdown = ({ cart }: { cart: Cart | null }) => {
  const t = useTranslations('components.cart');
  const isCartEmpty = !cart || cart.items.length === 0;

  return (
    <Dropdown
      icon={
        <div className="indicator">
          <ShoppingCartIcon className="h-6 w-6 text-primary" />
          {!isCartEmpty && (
            <span className="badge indicator-item badge-primary badge-sm">
              {cart?.totalQty}
            </span>
          )}
        </div>
      }
      position="right"
      contentClassName="card dropdown-content card-compact mt-2 w-64 bg-neutral p-2 text-secondary-content shadow-lg"
      ariaLabel="Cart dropdown"
    >
      {(closeDropdown) => (
        <div className="card-body">
          <h2 className="card-title">{t('myCart')}</h2>
          {!isCartEmpty ? (
            <>
              <ul className="space-y-2">
                {cart.items.map((item) => (
                  <li key={item.cartItemId} className="pb-2 pt-2">
                    <div className="flex flex-col text-left">
                      <p className="font-bold">{item.productName}</p>
                      <p className="mt-1 text-sm">
                        {t('size')}: {item.size}
                      </p>
                      <div className="mt-1 flex justify-between text-sm">
                        <span>
                          {t('quantity')}: {item.quantity}
                        </span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-2 border-t border-primary pt-2">
                <p className="flex justify-between text-sm">
                  <span>{t('quantity')}</span>
                  <span>{cart.totalQty}</span>
                </p>
                <p className="flex justify-between text-sm">
                  <span>{t('total')}</span>
                  <span>€{cart.totalPrice.toFixed(2)}</span>
                </p>
              </div>
              <Link
                href="/cart"
                className="btn btn-primary btn-sm mt-2 w-full"
                onClick={closeDropdown}
              >
                {t('goToCart')}
              </Link>
            </>
          ) : (
            <p className="text-center text-sm">{t('emptyCart')}</p>
          )}
        </div>
      )}
    </Dropdown>
  );
};
