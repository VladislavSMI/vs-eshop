import { executeQuery } from '@/lib/db';
import { Cart, CartItem } from '@/lib/types';
import { CartRow, ProductVariationRow } from '../QueryResults';
import { CartMappers } from '../mappers/cartMappers';

export async function getCartById(cartId: string): Promise<Cart | null> {
  const query = `
    SELECT c.cart_id, ci.cart_item_id, ci.product_id, ci.size_id, ci.quantity, 
           p.product_name, p.price, s.size
    FROM carts c
    LEFT JOIN cart_items ci ON c.cart_id = ci.cart_id
    LEFT JOIN products p ON ci.product_id = p.product_id
    LEFT JOIN sizes s ON ci.size_id = s.size_id
    WHERE c.cart_id = $1;
  `;

  const data = await executeQuery<CartRow>({ query, values: [cartId] });

  if (data.rows.length === 0) {
    return null;
  }

  return CartMappers.mapCart(data.rows);
}

export async function createCart(): Promise<Cart> {
  const query = `INSERT INTO carts DEFAULT VALUES RETURNING cart_id;`;

  const data = await executeQuery<{ cart_id: CartRow['cart_id'] }>({ query });

  return {
    id: data.rows[0].cart_id,
    items: [],
    totalQty: 0,
    totalPrice: 0,
  };
}

export async function validateStock({
  productId,
  sizeId,
  quantity,
  cartId,
}: {
  productId: string;
  sizeId: number;
  quantity: number;
  cartId: string;
}): Promise<boolean> {
  const query = `
    SELECT 
      pv.stock_quantity, 
      COALESCE(SUM(ci.quantity), 0)::INTEGER AS cart_quantity
    FROM product_variations pv
    LEFT JOIN cart_items ci ON pv.product_id = ci.product_id AND pv.size_id = ci.size_id AND ci.cart_id = $1
    WHERE pv.product_id = $2 AND pv.size_id = $3
    GROUP BY pv.stock_quantity;
  `;

  const data = await executeQuery<{
    stock_quantity: ProductVariationRow['stock_quantity'];
    cart_quantity: CartRow['quantity'];
  }>({
    query,
    values: [cartId, productId, sizeId],
  });

  if (data.rows.length === 0) {
    return false;
  }

  const { stock_quantity, cart_quantity } = data.rows[0];
  return stock_quantity >= cart_quantity + quantity;
}

export async function upsertItemToCart({
  cartId,
  productId,
  sizeId,
  quantity,
  isQtyIncremented,
}: {
  cartId: string;
  productId: string;
  sizeId: number;
  quantity: number;
  isQtyIncremented: boolean;
}): Promise<boolean> {
  if (quantity <= 0) {
    return await deleteCartItem({ cartId, productId, sizeId });
  }

  const query = `
  INSERT INTO cart_items (cart_id, product_id, size_id, quantity)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (cart_id, product_id, size_id)
  DO UPDATE 
    SET quantity = CASE
      WHEN $5 THEN cart_items.quantity + EXCLUDED.quantity
      ELSE EXCLUDED.quantity
    END;
`;

  const data = await executeQuery({
    query,
    values: [cartId, productId, sizeId, quantity, isQtyIncremented],
  });

  return (data.rowCount ?? 0) > 0;
}

export async function deleteCartItem({
  cartId,
  productId,
  sizeId,
}: {
  cartId: string;
  productId: string;
  sizeId: number;
}): Promise<boolean> {
  const query = `
    DELETE FROM cart_items
    WHERE cart_id = $1 AND product_id = $2 AND size_id = $3;
  `;

  const data = await executeQuery({
    query,
    values: [cartId, productId, sizeId],
  });

  return (data.rowCount ?? 0) > 0;
}

export async function deleteCartItemById(
  cartItemId: CartItem['cartItemId'],
): Promise<boolean> {
  const query = `
    DELETE FROM cart_items
    WHERE cart_item_id = $1;
  `;

  const data = await executeQuery({
    query,
    values: [cartItemId],
  });

  return (data.rowCount ?? 0) > 0;
}
