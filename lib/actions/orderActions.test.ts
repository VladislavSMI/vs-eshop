import { ZodError } from 'zod';
import { ShippingAddressSchema } from '@/lib/validation/schemas/shippingAddressSchema';
import { upsertShippingAddressUseCase } from '@/use-cases/address';
import { createOrderUseCase, cancelOrderUseCase } from '@/use-cases/order';
import {
  createSuccessResponse,
  createErrorResponse,
  createValidationErrorResponse,
} from '@/lib/utils/apiUtils/createApiResponse';
import { createOrderCheckoutSession } from '@/lib/stripe/utils/createOrderCheckoutSession';
import {
  createOrder,
  createOrderAndCheckoutSession,
} from '@/lib/actions/orderActions';
import {
  errorResponse,
  mockAddress,
  mockOrder,
  successResponse,
} from '@/__test__/mocks';

jest.mock('@/lib/db', () => ({}));
jest.mock('@/use-cases/order');
jest.mock('@/use-cases/address');
jest.mock('@/lib/utils/apiUtils/createApiResponse');
jest.mock('@/lib/validation/schemas/shippingAddressSchema');
jest.mock('@/lib/utils/utils');
jest.mock('@/lib/logging/log');

interface CheckoutSessionModuleMock {
  createOrderCheckoutSession: jest.Mock<Promise<{ id: string }>, [string]>;
}

// Mock the checkout session helper.
// The real file has top-level code (e.g. it creates a Stripe client),
// so we pass a factory object to `jest.mock(...)` to stop Jest from
// evaluating the real implementation and to expose our own mock.
jest.mock(
  '@/lib/stripe/utils/createOrderCheckoutSession',
  (): CheckoutSessionModuleMock => ({
    createOrderCheckoutSession: jest.fn(),
  }),
);

// Typed mocks
const mockShippingAddressSchema = jest.mocked(ShippingAddressSchema);
const mockCreateShippingAddressUC = jest.mocked(upsertShippingAddressUseCase);
const mockOrderUC = {
  create: jest.mocked(createOrderUseCase),
  cancel: jest.mocked(cancelOrderUseCase),
};
const mockCreateSuccessResponse = jest.mocked(createSuccessResponse);
const mockCreateErrorResponse = jest.mocked(createErrorResponse);
const mockValidationErrorResponse = jest.mocked(createValidationErrorResponse);
const mockCheckoutSession = jest.mocked(createOrderCheckoutSession);

const fd = new FormData();
fd.set('countryId', '1');
fd.set('street', 'Main St');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('createOrderAndCheckoutSession()', () => {
  it('should return an error response when provided invalid address data', async () => {
    mockShippingAddressSchema.safeParse.mockReturnValue({
      success: false,
      error: new ZodError([]),
    });
    mockValidationErrorResponse.mockReturnValue(errorResponse('INVALID'));

    const res = await createOrderAndCheckoutSession('cartA', fd);

    expect(mockValidationErrorResponse).toHaveBeenCalled();
    expect(res).toEqual(errorResponse('INVALID'));
  });

  it('should return the checkout session ID when order creation and session creation succeed', async () => {
    mockShippingAddressSchema.safeParse.mockReturnValue({
      success: true,
      data: mockAddress,
    });
    mockCreateShippingAddressUC.mockResolvedValue(mockAddress);
    mockOrderUC.create.mockResolvedValue(mockOrder);
    mockCheckoutSession.mockResolvedValue({ id: 'sess_123' });

    // First createOrder response
    mockCreateSuccessResponse.mockImplementationOnce(() =>
      successResponse({ order: mockOrder }),
    );
    // Then checkout session response
    mockCreateSuccessResponse.mockImplementationOnce(() =>
      successResponse({ id: 'sess_123' }),
    );

    const res = await createOrderAndCheckoutSession('cartB', fd);

    expect(res).toEqual(successResponse({ id: 'sess_123' }));
  });

  it('should cancel the order and return an error response when checkout session creation fails', async () => {
    mockShippingAddressSchema.safeParse.mockReturnValue({
      success: true,
      data: mockAddress,
    });
    mockCreateShippingAddressUC.mockResolvedValue(mockAddress);
    mockOrderUC.create.mockResolvedValue(mockOrder);
    mockCheckoutSession.mockRejectedValue(
      new Error('checkout session failure'),
    );
    mockOrderUC.cancel.mockResolvedValue(true);

    mockCreateSuccessResponse.mockReturnValue(
      successResponse({ order: mockOrder }),
    );
    mockCreateErrorResponse.mockReturnValue(
      errorResponse('CHECKOUT_SESSION_FAIL'),
    );

    const res = await createOrderAndCheckoutSession('cartC', fd);

    expect(mockOrderUC.cancel).toHaveBeenCalledWith(mockOrder.id);
    expect(res).toEqual(errorResponse('CHECKOUT_SESSION_FAIL'));
  });

  it('should return an error response when order creation throws an unexpected exception', async () => {
    mockShippingAddressSchema.safeParse.mockReturnValue({
      success: true,
      data: mockAddress,
    });
    mockCreateShippingAddressUC.mockResolvedValue(mockAddress);
    mockOrderUC.create.mockRejectedValue(new Error('dbDown'));
    mockCreateErrorResponse.mockReturnValue(errorResponse('UNEXPECTED'));

    const res = await createOrder('cartD', fd);

    expect(mockCreateErrorResponse).toHaveBeenCalled();
    expect(res).toEqual(errorResponse('UNEXPECTED'));
  });
});
