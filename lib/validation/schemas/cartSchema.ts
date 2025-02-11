import { z } from 'zod';
import { numberValidator, qtyValidator, uuidValidator } from '../validators';

export const UpdateItemSchema = z.object({
  productId: uuidValidator(),
  sizeId: numberValidator(),
  quantity: qtyValidator(0, 100),
  isQtyIncremented: z.boolean(),
});

export const DeleteItemSchema = z.object({
  cartItemId: uuidValidator(),
});
