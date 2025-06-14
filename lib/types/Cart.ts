export interface CartItem {
  cartItemId: string;
  productId: string;
  sizeId: number;
  quantity: number;
  productName: string;
  price: number;
  size: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalQty: number;
  totalPrice: number;
}

export interface CartItemSelection {
  productId: string;
  sizeId: number | null;
  quantity: number;
}
