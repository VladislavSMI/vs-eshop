import { runInSerializable, executeQuery } from '@/lib/db';
import {
  createOrderWithItems,
  updateOrderState,
  getOrderById,
  cancelOrderWithItems,
} from '@/data/repository/OrderRepository';
import { OrderMappers } from '@/data/mappers/orderMappers';
import { mockOrder } from '@/__test__/mocks';

jest.mock('@/lib/db', () => ({
  executeQuery: jest.fn(),
  runInSerializable: jest.fn(),
}));

jest.mock('@/data/mappers/orderMappers', () => ({
  OrderMappers: { mapOrder: jest.fn() },
}));

const mockClient = {
  query: jest.fn(),
  release: jest.fn(),
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('createOrderWithItems', () => {
  it('calls mapOrder with fetched rows and returns the order', async () => {
    (OrderMappers.mapOrder as jest.Mock).mockReturnValue(mockOrder);
    (runInSerializable as jest.Mock).mockImplementation(async ({ action }) => {
      mockClient.query
        .mockResolvedValueOnce({ rowCount: 1 }) // updateStock
        .mockResolvedValueOnce({ rows: [{ order_id: mockOrder.id }] }) // createOrder
        .mockResolvedValueOnce({ rowCount: 1 }) // insertOrderItems
        .mockResolvedValueOnce({ rows: [mockOrder] }); // getOrderById

      return action(mockClient);
    });

    const result = await createOrderWithItems({
      cartId: mockOrder.cartId!,
      shippingAddressId: mockOrder.shippingAddressId,
    });

    expect(OrderMappers.mapOrder).toHaveBeenCalledWith([mockOrder]);
    expect(result).toEqual(mockOrder);
  });
});

describe('getOrderById', () => {
  it('returns mapped order if found', async () => {
    (executeQuery as jest.Mock).mockResolvedValue({ rows: [mockOrder] });
    (OrderMappers.mapOrder as jest.Mock).mockReturnValue(mockOrder);

    const result = await getOrderById('o1');
    expect(result).toEqual(mockOrder);
  });

  it('returns null if not found', async () => {
    (executeQuery as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await getOrderById('o2');
    expect(result).toBeNull();
  });
});

describe('updateOrderState', () => {
  it('returns true when rowCount is > 0', async () => {
    (executeQuery as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const result = await updateOrderState({ orderId: 'o1', state: 'paid' });
    expect(result).toBe(true);
  });

  it('returns false when rowCount is 0', async () => {
    (executeQuery as jest.Mock).mockResolvedValue({ rowCount: 0 });
    const result = await updateOrderState({ orderId: 'o1', state: 'paid' });
    expect(result).toBe(false);
  });
});

describe('cancelOrderWithItems', () => {
  it('returns true when both updates succeed', async () => {
    (runInSerializable as jest.Mock).mockImplementation(async ({ action }) => {
      mockClient.query
        .mockResolvedValueOnce({ rowCount: 1 }) // updateOrderState
        .mockResolvedValueOnce({ rowCount: 1 }); // restoreStock
      return action(mockClient);
    });

    const result = await cancelOrderWithItems('o1');
    expect(result).toBe(true);
  });
});
