import { CartItem, Cart, CartItemSelection } from '@/lib/types';

export const mockCartItems: CartItem[] = [
  {
    cartItemId: 'ci1',
    productId: 'p1',
    sizeId: 2,
    quantity: 1,
    productName: 'Skate Deck',
    price: 50,
    size: 8,
  },
  {
    cartItemId: 'ci2',
    productId: 'p2',
    sizeId: 1,
    quantity: 2,
    productName: 'Skate Truck',
    price: 20,
    size: 5,
  },
];

export const mockCart: Cart = {
  id: 'cart123',
  items: mockCartItems,
  totalQty: mockCartItems.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ),
};

export const mockCartItemSelection: CartItemSelection = {
  productId: 'p1',
  sizeId: 2,
  quantity: 1,
};

export const mockInvalidCartItemSelection: CartItemSelection = {
  productId: 'p1',
  sizeId: null,
  quantity: 1,
};
