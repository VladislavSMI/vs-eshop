import { Order } from '@/lib/types';

export const mockOrder: Order = {
  id: 'order-1',
  cartId: 'cart-1',
  shippingAddressId: 'ship-addr-1',
  state: 'CREATED',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  items: [],
  isPaid: false,
};
