import { pool, executeQuery } from '@/lib/db';
import {
  createOrderWithItems,
  updateOrderState,
} from '@/data/repository/OrderRepository';
import { OrderMappers } from '@/data/mappers/orderMappers';
import { mockOrder } from '@/__test__/mocks';

jest.mock('@/lib/db', () => ({
  pool: { connect: jest.fn() },
  executeQuery: jest.fn(),
}));
jest.mock('@/data/mappers/orderMappers', () => ({
  OrderMappers: { mapOrder: jest.fn() },
}));

describe('createOrderWithItems', () => {
  const client = { query: jest.fn(), release: jest.fn() };

  beforeEach(() => {
    jest.resetAllMocks();

    (pool.connect as jest.Mock).mockResolvedValue(client);

    client.query
      .mockResolvedValueOnce({}) // BEGIN
      .mockResolvedValueOnce({ rowCount: 1 }) // updateStock
      .mockResolvedValueOnce({ rows: [{ order_id: mockOrder.id }] }) // insert order
      .mockResolvedValueOnce({ rowCount: 1 }) // insert items
      .mockResolvedValueOnce({ rows: [{}] }) // fetch order
      .mockResolvedValueOnce({}); // COMMIT

    (OrderMappers.mapOrder as jest.Mock).mockReturnValue(mockOrder);
  });

  it('returns the mapped order and releases the client', async () => {
    const out = await createOrderWithItems({
      cartId: mockOrder.cartId!,
      shippingAddressId: mockOrder.shippingAddressId,
    });

    expect(out).toBe(mockOrder);
    expect(client.query).toHaveBeenCalledWith('COMMIT');
    expect(client.release).toHaveBeenCalled();
  });
});

const mockExec = executeQuery as jest.Mock;
const rows = (rowCount: number): unknown => ({ rowCount, rows: [] }) as unknown;

describe('updateOrderState', () => {
  beforeEach(() => jest.resetAllMocks());

  it('resolves true when a row is updated', async () => {
    mockExec.mockResolvedValue(rows(1));
    await expect(
      updateOrderState({ orderId: 'o1', state: 'paid' }),
    ).resolves.toBe(true);
  });

  it('resolves false when no row matches', async () => {
    mockExec.mockResolvedValue(rows(0));
    await expect(
      updateOrderState({ orderId: 'missing', state: 'paid' }),
    ).resolves.toBe(false);
  });
});
