import { z } from 'zod';
import {
  emailValidator,
  numberValidator,
  stringValidator,
} from '../validators';

export const ShippingAddressSchema = z.object({
  firstName: stringValidator(100),
  lastName: stringValidator(100),
  email: emailValidator(),
  address: stringValidator(500),
  city: stringValidator(100),
  stateProvince: stringValidator(100),
  postalCode: stringValidator(20),
  countryId: numberValidator(),
});
