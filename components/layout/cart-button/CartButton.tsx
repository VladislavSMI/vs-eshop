import { fetchCartUseCase } from '@/use-cases/cart';
import { CartDropdown } from './CartDropdown';

export const CartButton = async () => {
  const cart = await fetchCartUseCase();

  return <CartDropdown cart={cart} />;
};
