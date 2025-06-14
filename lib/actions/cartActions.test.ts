import { ZodError } from 'zod';
import {
  mockCart,
  mockCartItemSelection,
  mockInvalidCartItemSelection,
} from '@/__test__/mocks/CartMocks';
import {
  UpdateItemSchema,
  DeleteItemSchema,
} from '@/lib/validation/schemas/cartSchema';
import {
  updateCartItemUseCase,
  createCartUseCase,
  deleteCartItemUseCase,
} from '@/use-cases/cart';
import { getCartIdFromCookies } from '@/lib/utils/cookies';
import { revalidatePath } from 'next/cache';
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createErrorResponse,
} from '@/lib/utils/apiUtils/createApiResponse';
import { updateCartItem, deleteCartItem } from '@/lib/actions/cartActions';
import { errorResponse, successResponse } from '@/__test__/mocks';

jest.mock('@/lib/validation/schemas/cartSchema');
jest.mock('@/lib/utils/apiUtils/createApiResponse');
jest.mock('@/lib/logging/log');
jest.mock('@/use-cases/cart', () => ({
  updateCartItemUseCase: jest.fn(),
  createCartUseCase: jest.fn(),
  deleteCartItemUseCase: jest.fn(),
}));
jest.mock('@/lib/utils/cookies', () => ({
  getCartIdFromCookies: jest.fn(),
}));
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

// Typed mocks
const mockUpdateItemSchema = jest.mocked(UpdateItemSchema.safeParse);
const mockDeleteItemSchema = jest.mocked(DeleteItemSchema.safeParse);
const mockUpdateCartItemUC = jest.mocked(updateCartItemUseCase);
const mockCreateCartUC = jest.mocked(createCartUseCase);
const mockDeleteCartItemUC = jest.mocked(deleteCartItemUseCase);
const mockGetCartId = jest.mocked(getCartIdFromCookies);
const mockRevalidate = jest.mocked(revalidatePath);
const mockCreateSuccessResponse = jest.mocked(createSuccessResponse);
const mockCreateValidationErrorResponse = jest.mocked(
  createValidationErrorResponse,
);
const mockCreateErrorResponse = jest.mocked(createErrorResponse);

describe('updateCartItem', () => {
  // cast once so TS knows none of these are null
  const selection = {
    ...mockCartItemSelection,
    sizeId: mockCartItemSelection.sizeId!,
    isQtyIncremented: true,
  };

  beforeEach(() => {
    jest.resetAllMocks();

    mockUpdateItemSchema.mockReturnValue({
      success: true,
      data: selection,
    });
    mockGetCartId.mockReturnValue(mockCart.id);
    mockCreateCartUC.mockResolvedValue(mockCart);
    mockUpdateCartItemUC.mockResolvedValue(true);
    mockCreateSuccessResponse.mockReturnValue(successResponse<null>(null));
  });

  it('should return a validation error when the input is invalid', async () => {
    const zError = new ZodError([]);
    mockUpdateItemSchema.mockReturnValue({ success: false, error: zError });
    mockCreateValidationErrorResponse.mockReturnValue(errorResponse('INVALID'));

    const resp = await updateCartItem({
      cartItemSelection: mockInvalidCartItemSelection,
      isQtyIncremented: false,
    });

    expect(mockCreateValidationErrorResponse).toHaveBeenCalledWith(zError);
    expect(resp).toEqual(errorResponse('INVALID'));
  });

  it('should create a new cart when no cart ID is found in cookies', async () => {
    mockGetCartId.mockReturnValue(undefined);

    mockUpdateItemSchema.mockReturnValue({
      success: true,
      data: { ...selection, isQtyIncremented: false },
    });

    await updateCartItem({
      cartItemSelection: selection,
      isQtyIncremented: false,
    });

    expect(mockCreateCartUC).toHaveBeenCalled();
    expect(mockUpdateCartItemUC).toHaveBeenCalledWith({
      cartId: mockCart.id,
      ...selection,
      isQtyIncremented: false,
    });
  });

  it('should use an existing cart ID from cookies', async () => {
    mockGetCartId.mockReturnValue(mockCart.id);

    mockUpdateItemSchema.mockReturnValue({
      success: true,
      data: { ...selection, isQtyIncremented: false },
    });

    await updateCartItem({
      cartItemSelection: selection,
      isQtyIncremented: false,
    });

    expect(mockCreateCartUC).not.toHaveBeenCalled();
    expect(mockUpdateCartItemUC).toHaveBeenCalledWith({
      cartId: mockCart.id,
      ...selection,
      isQtyIncremented: false,
    });
  });

  it('should revalidate the cart page and return a success response on update', async () => {
    const resp = await updateCartItem({
      cartItemSelection: selection,
      isQtyIncremented: true,
    });

    expect(mockRevalidate).toHaveBeenCalledWith('/cart');
    expect(mockCreateSuccessResponse).toHaveBeenCalledWith({
      code: 'CART_ITEM_UPDATED',
      messageKey: 'responseSuccess.updateCart',
    });
    expect(resp).toEqual(successResponse<null>(null));
  });

  it('should return an error response when the update use case throws', async () => {
    const err = new Error('fail');
    mockUpdateCartItemUC.mockRejectedValue(err);
    mockCreateErrorResponse.mockReturnValue(errorResponse('ERROR'));

    const resp = await updateCartItem({
      cartItemSelection: selection,
      isQtyIncremented: false,
    });

    expect(mockCreateErrorResponse).toHaveBeenCalledWith(err);
    expect(resp).toEqual(errorResponse('ERROR'));
  });
});

describe('deleteCartItem', () => {
  const itemId = mockCartItemSelection.productId!;

  beforeEach(() => {
    jest.resetAllMocks();
    mockDeleteItemSchema.mockReturnValue({
      success: true,
      data: { cartItemId: itemId },
    });
    mockDeleteCartItemUC.mockResolvedValue(true);
    mockCreateSuccessResponse.mockReturnValue(successResponse<null>(null));
  });

  it('should return a validation error when the cartItemId is invalid', async () => {
    const zError = new ZodError([]);
    mockDeleteItemSchema.mockReturnValue({ success: false, error: zError });
    mockCreateValidationErrorResponse.mockReturnValue(errorResponse('INVALID'));

    const resp = await deleteCartItem(itemId);

    expect(mockCreateValidationErrorResponse).toHaveBeenCalledWith(zError);
    expect(resp).toEqual(errorResponse('INVALID'));
  });

  it('should call the delete use case and revalidate on success', async () => {
    const resp = await deleteCartItem(itemId);

    expect(mockDeleteCartItemUC).toHaveBeenCalledWith(itemId);
    expect(mockRevalidate).toHaveBeenCalledWith('/cart');
    expect(mockCreateSuccessResponse).toHaveBeenCalledWith({
      code: 'CART_ITEM_DELETED',
      messageKey: 'responseSuccess.deleteCartItem',
    });
    expect(resp).toEqual(successResponse<null>(null));
  });

  it('should return an error response when the delete use case throws', async () => {
    const err = new Error('fail');
    mockDeleteCartItemUC.mockRejectedValue(err);
    mockCreateErrorResponse.mockReturnValue(errorResponse('ERROR'));

    const resp = await deleteCartItem(itemId);

    expect(mockCreateErrorResponse).toHaveBeenCalledWith(err);
    expect(resp).toEqual(errorResponse('ERROR'));
  });
});
