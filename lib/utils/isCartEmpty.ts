import { Cart } from '@/lib/types';

export function isCartEmpty(cart: Cart | null): boolean {
  return !cart || !cart.items.length;
}
