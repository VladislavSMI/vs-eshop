import { cookies } from 'next/headers';

export const getCartIdFromCookies = (): string | undefined =>
  cookies().get('vs_shop_cart_id')?.value;

export const setCartIdInCookies = (cartId: string) => {
  cookies().set('vs_shop_cart_id', cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const removeCartIdFromCookies = () => {
  cookies().delete('vs_shop_cart_id');
};
