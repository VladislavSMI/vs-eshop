import { getCartIdFromCookies } from '@/lib/utils/cookies';
import { getCartByIdUseCase } from '@/use-cases/cart';
import { CartDropdown } from './CartDropdown';

const fetchCart = async () => {
  const cartId = getCartIdFromCookies();

  if (!cartId) {
    return null;
  }

  return getCartByIdUseCase(cartId);
};

export default async function CartButton() {
  const cart = await fetchCart();

  return <CartDropdown cart={cart} />;
}
