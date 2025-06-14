import {
  createOrderWithItems,
  cancelOrderWithItems,
} from '@/data/repository/OrderRepository';
import { PublicError } from '@/lib/errors/PublicError';
import { mockOrder } from '@/__test__/mocks';
import { createOrderUseCase, cancelOrderUseCase } from './order';

jest.mock('@/lib/db', () => ({}));
jest.mock('@/data/repository/OrderRepository');
jest.mock('@/lib/logging/log');

const mockCreateRepo = jest.mocked(createOrderWithItems);
const mockCancelRepo = jest.mocked(cancelOrderWithItems);

describe('createOrderUseCase()', () => {
  const cartId = 'cart-42';
  const shippingAddressId = 'addr-99';

  beforeEach(() => jest.resetAllMocks());

  it('returns the newly-created order on success', async () => {
    mockCreateRepo.mockResolvedValue(mockOrder);

    const order = await createOrderUseCase({ cartId, shippingAddressId });

    expect(mockCreateRepo).toHaveBeenCalledWith({ cartId, shippingAddressId });
    expect(order).toBe(mockOrder);
  });

  it('re-throws domain (PublicError) failures unchanged', async () => {
    const domainErr = new PublicError({
      code: 'OUT_OF_STOCK',
      message: '',
      messageKey: 'responseError.outOfStock',
    });
    mockCreateRepo.mockRejectedValue(domainErr);

    await expect(
      createOrderUseCase({ cartId, shippingAddressId }),
    ).rejects.toBe(domainErr);
  });

  it('converts unexpected errors into a generic PublicError', async () => {
    mockCreateRepo.mockRejectedValue(new Error('db offline'));

    await expect(
      createOrderUseCase({ cartId, shippingAddressId }),
    ).rejects.toBeInstanceOf(PublicError);
  });
});

describe('cancelOrderUseCase()', () => {
  const orderId = 'order-7';

  beforeEach(() => jest.resetAllMocks());

  it('confirms the cancellation when the repository succeeds', async () => {
    mockCancelRepo.mockResolvedValue(true);

    await expect(cancelOrderUseCase(orderId)).resolves.toBe(true);
    expect(mockCancelRepo).toHaveBeenCalledWith(orderId);
  });

  it('re-throws domain failures unchanged', async () => {
    const domainErr = new PublicError({
      code: 'CANCELLATION_WINDOW_PASSED',
      message: '',
      messageKey: 'responseError.unexpected',
    });
    mockCancelRepo.mockRejectedValue(domainErr);

    await expect(cancelOrderUseCase(orderId)).rejects.toBe(domainErr);
  });

  it('wraps unknown errors in PublicError', async () => {
    mockCancelRepo.mockRejectedValue(new Error('network glitch'));

    await expect(cancelOrderUseCase(orderId)).rejects.toBeInstanceOf(
      PublicError,
    );
  });
});
