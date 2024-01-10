import {z} from 'zod';
import {UserEditInputSchema} from './objects/UserInput.schema';

export const UserUpdateArgsSchema = z.object({
  data: UserEditInputSchema,
  userId: z.string().cuid(),
});
