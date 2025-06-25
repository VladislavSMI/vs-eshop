import { executeQuery, runInSerializable } from '@/lib/db';
import { Order } from '@/lib/types';
import { orderQueries } from '../queries/orderQueries';
import { OrderMappers } from '../mappers/orderMappers';
import { OrderRow } from '../QueryResults';

export async function createOrderWithItems({
  cartId,
  shippingAddressId,
}: {
  cartId: string;
  shippingAddressId: string;
}): Promise<Order> {
  return runInSerializable({
    action: async (client) => {
      const {
        updateStock,
        createOrder,
        insertOrderItems,
        getOrderById: getOrderByIdQuery,
      } = orderQueries;

      // Step 1: Deduct stock
      const stockResult = await client.query(updateStock, [cartId]);
      if (stockResult.rowCount === 0) {
        throw new Error('Insufficient stock for one or more items.');
      }

      // Step 2: Create the order
      const orderResult = await client.query(createOrder, [
        cartId,
        shippingAddressId,
      ]);
      if (orderResult.rows.length === 0) {
        throw new Error('Failed to create order.');
      }

      const orderId = orderResult.rows[0].order_id;

      // Step 3: Insert order items
      const itemsResult = await client.query(insertOrderItems, [
        orderId,
        cartId,
      ]);
      if (itemsResult.rowCount === 0) {
        throw new Error('Failed to insert order items.');
      }

      // Step 4: Fetch and return the created order
      const createdOrder = await client.query<OrderRow>(getOrderByIdQuery, [
        orderId,
      ]);

      if (createdOrder.rows.length === 0) {
        throw new Error('Failed to fetch created order.');
      }

      return OrderMappers.mapOrder(createdOrder.rows);
    },
  });
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const result = await executeQuery<OrderRow>({
    query: orderQueries.getOrderById,
    values: [orderId],
  });

  if (result.rows.length === 0) {
    return null;
  }

  return OrderMappers.mapOrder(result.rows);
}

export async function updateOrderState({
  orderId,
  state,
}: {
  orderId: Order['id'];
  state: Order['state'];
}): Promise<boolean> {
  const result = await executeQuery({
    query: orderQueries.updateOrderState,
    values: [state, orderId],
  });

  return (result.rowCount ?? 0) > 0;
}

export async function cancelOrderWithItems(orderId: string): Promise<boolean> {
  return runInSerializable({
    action: async (client) => {
      // Step 1: Update order status to 'cancelled'
      const updateResult = await client.query(orderQueries.updateOrderState, [
        'cancelled',
        orderId,
      ]);
      if (updateResult.rowCount === 0) {
        throw new Error('Failed to update order status to cancelled.');
      }

      // Step 2: Restore stock for cancelled order items
      const restoreStockResult = await client.query(orderQueries.restoreStock, [
        orderId,
      ]);
      if (restoreStockResult.rowCount === 0) {
        throw new Error('Failed to restore stock for cancelled order items.');
      }

      return true;
    },
  });
}
