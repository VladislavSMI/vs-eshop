import { z } from 'zod';
import { emailValidator, stringValidator } from '../validators';

export const UserSchema = z.object({
  email: emailValidator(),
  password: stringValidator(25),
});
