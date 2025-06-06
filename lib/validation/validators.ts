import { createValidationMessage } from '@/lib/utils/apiUtils/createApiResponse';
import { z } from 'zod';

const error = 'responseError.validation';

export const stringValidator = (maxLength: number, isOptional = false) => {
  const baseSchema = z
    .string()
    .trim()
    .min(1, {
      message: createValidationMessage(`${error}.general.required`),
    })
    .max(maxLength, {
      message: createValidationMessage(`${error}.quantity.invalid`),
    });

  return isOptional ? baseSchema.optional() : baseSchema;
};

export const emailValidator = () =>
  z
    .string()
    .trim()
    .min(1, {
      message: createValidationMessage(`${error}.general.required`),
    })
    .email({
      message: createValidationMessage(`${error}.general.invalid`),
    })
    .max(100, {
      message: createValidationMessage(`${error}.general.invalid`),
    });

export const uuidValidator = () =>
  z
    .string({
      message: createValidationMessage(`${error}.general.invalid`),
    })
    .uuid({
      message: createValidationMessage(`${error}.productId.invalid`),
    });

export const numberValidator = () =>
  z
    .number({
      message: createValidationMessage(`${error}.general.invalid`),
    })
    .positive({
      message: createValidationMessage(`${error}.general.invalid`),
    })
    .int({
      message: createValidationMessage(`${error}.general.invalid`),
    });

export const qtyValidator = (minQty: number, maxQty: number) =>
  z
    .number({
      message: createValidationMessage(`${error}.general.invalid`),
    })
    .min(minQty, {
      message: createValidationMessage(`${error}.quantity.invalid`),
    })
    .max(maxQty, {
      message: createValidationMessage(`${error}.quantity.invalid`),
    });
