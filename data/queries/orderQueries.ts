// orderQueries.ts
export const orderQueries = {
  updateStock: `
    UPDATE product_variations
    SET stock_quantity = stock_quantity - ci.quantity
    FROM cart_items ci
    WHERE ci.cart_id = $1
      AND product_variations.product_id = ci.product_id
      AND product_variations.size_id = ci.size_id
      AND product_variations.stock_quantity >= ci.quantity;
  `,

  createOrder: `
    INSERT INTO orders (cart_id, shipping_address_id, state)
    VALUES ($1, $2, 'created')
    RETURNING order_id, cart_id, shipping_address_id, state, created_at, updated_at;
  `,

  insertOrderItems: `
    INSERT INTO order_items (order_id, product_id, size_id, price, quantity)
    SELECT $1, ci.product_id, ci.size_id, p.price, ci.quantity
    FROM cart_items ci
    INNER JOIN products p ON ci.product_id = p.product_id
    WHERE ci.cart_id = $2;
  `,

  getOrderById: `
    SELECT 
      o.order_id,
      o.cart_id,
      o.shipping_address_id,
      o.state,
      o.created_at,
      o.updated_at,
      oi.order_item_id,
      oi.product_id,
      oi.size_id,
      oi.quantity,
      oi.price,
      p.product_name,
      s.size,
      EXISTS (
        SELECT 1
        FROM payments py
        WHERE py.order_id = o.order_id
        AND py.status = 'success'
      ) AS "isPaid"
    FROM 
      orders o
    LEFT JOIN 
      order_items oi ON o.order_id = oi.order_id
    LEFT JOIN 
      products p ON oi.product_id = p.product_id
    LEFT JOIN 
      sizes s ON oi.size_id = s.size_id
    WHERE 
      o.order_id = $1;
  `,

  updateOrderState: `
    UPDATE orders
    SET state = $1
      WHERE order_id = $2;
  `,

  restoreStock: `
    UPDATE product_variations pv
    SET stock_quantity = stock_quantity + oi.quantity
    FROM order_items oi
    WHERE oi.order_id = $1
      AND oi.product_id = pv.product_id
      AND oi.size_id = pv.size_id;
  `,
};
