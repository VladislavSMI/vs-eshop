import { z } from 'zod';
import { numberValidator, qtyValidator, uuidValidator } from '../validators';

export const AddItemSchema = z.object({
  productId: uuidValidator(),
  sizeId: numberValidator(),
  quantity: qtyValidator(1, 100),
});
