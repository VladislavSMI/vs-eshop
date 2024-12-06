import { Cart, CartItem } from '@/lib/types';
import { CartRow } from '@/data/QueryResults';

const mapCartItem = (row: CartRow): CartItem => ({
  cartItemId: row.cart_item_id,
  productId: row.product_id,
  sizeId: row.size_id,
  quantity: row.quantity,
  productName: row.product_name,
  price: row.price,
  size: row.size,
});

const mapCart = (rows: CartRow[]): Cart => {
  const items = rows.filter((row) => row.cart_item_id).map(mapCartItem);

  return {
    id: rows[0].cart_id,
    items,
    totalQty: items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    ),
  };
};

export const CartMappers = {
  mapCartItem,
  mapCart,
};
