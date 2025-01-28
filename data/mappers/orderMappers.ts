import { Order, OrderItem } from '@/lib/types';
import { OrderRow } from '@/data/QueryResults';

const mapOrderItem = (row: OrderRow): OrderItem => ({
  orderItemId: row.order_item_id,
  productId: row.product_id,
  sizeId: row.size_id,
  quantity: row.quantity,
  productName: row.product_name,
  price: parseFloat(row.price),
  size: row.size,
});

const mapOrder = (rows: OrderRow[]): Order => {
  const [orderData] = rows;

  const data: Order = {
    id: orderData.order_id,
    cartId: orderData.cart_id,
    shippingAddressId: orderData.shipping_address_id,
    state: orderData.state,
    isPaid: Boolean(orderData.isPaid),
    createdAt: orderData.created_at,
    updatedAt: orderData.updated_at,
    items: rows.filter((row) => row.order_item_id).map(mapOrderItem),
  };

  return data;
};

export const OrderMappers = {
  mapOrderItem,
  mapOrder,
};
