import { z, ZodError } from 'zod';
import {
  createValidationErrorResponse,
  createPublicErrorResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/utils/apiUtils/createApiResponse';
import { PublicError } from '@/lib/errors/PublicError';
import { UnexpectedError } from '@/lib/errors/UnexpectedError';

// test schema for validation errors
const deckSchema = z.object({
  productName: z.string({
    required_error: 'responseError.validation.productName',
    invalid_type_error: 'responseError.validation.productName',
  }),
  quantity: z
    .number({
      required_error: 'responseError.validation.quantity',
      invalid_type_error: 'responseError.validation.quantity',
    })
    .min(1, 'responseError.validation.quantity')
    .max(100, 'responseError.validation.quantity'),
});

describe('API-response helpers', () => {
  describe('createValidationErrorResponse()', () => {
    it('turns a failed Zod parse into a structured “error” payload', () => {
      // deliberately fail both fields
      const { error } = deckSchema.safeParse({ productName: 123 }) as {
        error: ZodError;
      };

      const res = createValidationErrorResponse(error);

      expect(res).toMatchObject({
        status: 'error',
        details: {
          code: 'VALIDATION_ERROR',
          messageKey: 'responseError.validation.general.invalid',
        },
      });

      // failing fields are present
      expect(Object.keys(res.details.fields ?? {})).toEqual(
        expect.arrayContaining(['productName', 'quantity']),
      );

      // each key maps to at least one translated message
      expect(res.details.fields?.productName).toEqual(
        expect.arrayContaining(['responseError.validation.productName']),
      );
      expect(res.details.fields?.quantity).toEqual(
        expect.arrayContaining(['responseError.validation.quantity']),
      );
    });
  });

  describe('createPublicErrorResponse()', () => {
    it('it creates public error', () => {
      const err = new PublicError({
        code: 'CART_LOCKED',
        message: 'Cart locked for checkout',
        messageKey: 'responseError.unexpected',
      });

      expect(createPublicErrorResponse(err)).toEqual({
        status: 'error',
        details: {
          code: 'CART_LOCKED',
          messageKey: 'responseError.unexpected',
        },
      });
    });
  });

  describe('createSuccessResponse()', () => {
    it('returns data when a payload is supplied', () => {
      const payload = { orderId: 'ord_123' };

      expect(
        createSuccessResponse({
          code: 'CHECKOUT_OK',
          messageKey: 'responseSuccess.orderSuccess',
          data: payload,
        }),
      ).toEqual({
        status: 'success',
        data: payload,
        details: {
          code: 'CHECKOUT_OK',
          messageKey: 'responseSuccess.orderSuccess',
        },
      });
    });

    it('omits the data key when no payload is supplied', () => {
      expect(
        createSuccessResponse({
          code: 'PING',
          messageKey: 'responseSuccess.updateCart',
        }),
      ).toEqual({
        status: 'success',
        data: undefined,
        details: { code: 'PING', messageKey: 'responseSuccess.updateCart' },
      });
    });
  });

  describe('createErrorResponse()', () => {
    it('passes PublicError instances straight through', () => {
      const pubErr = new PublicError({
        code: 'OUT_OF_STOCK',
        message: 'No stock left',
        messageKey: 'responseError.outOfStock',
      });

      expect(createErrorResponse(pubErr)).toEqual(
        createPublicErrorResponse(pubErr),
      );
    });

    it('wraps unexpected errors in an UnexpectedError wrapper', () => {
      const fallback = createPublicErrorResponse(new UnexpectedError());

      expect(createErrorResponse(new Error('boom'))).toEqual(fallback);
    });
  });
});
