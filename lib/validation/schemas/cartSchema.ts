import { createValidationMessage } from '@/lib/utils/createApiResponse';
import { z } from 'zod';

const error = 'responseError.validation';

export const AddItemSchema = z.object({
  productId: z
    .string({
      message: createValidationMessage(`${error}.general.invalidType`),
    })
    .uuid({
      message: createValidationMessage(`${error}.productId.invalid`),
    }),
  sizeId: z
    .number({
      message: createValidationMessage(`${error}.general.invalidType`),
    })
    .positive({
      message: createValidationMessage(`${error}.sizeId.invalid`),
    })
    .int({
      message: createValidationMessage(`${error}.sizeId.invalid`),
    }),
  quantity: z
    .number({
      message: createValidationMessage(`${error}.general.invalidType`),
    })
    .positive({
      message: createValidationMessage(`${error}.quantity.invalid`),
    })
    .min(1, {
      message: createValidationMessage(`${error}.quantity.invalid`),
    })
    .max(100, {
      message: createValidationMessage(`${error}.quantity.invalid`),
    }),
});
