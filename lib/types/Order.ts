import { ORDER_STATES } from '../const';

export type OrderState = (typeof ORDER_STATES)[number];

export type OrderItem = {
  orderItemId: string;
  productId: string;
  sizeId: number;
  quantity: number;
  productName: string;
  price: number;
  size: number;
};

export type Order = {
  id: string;
  cartId: string | null;
  shippingAddressId: string;
  state: OrderState;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  isPaid: boolean;
};
