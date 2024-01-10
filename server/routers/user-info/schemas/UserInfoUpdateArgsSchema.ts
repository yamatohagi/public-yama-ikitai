import {z} from 'zod';
import {UserInfoInputSchema} from './objects/UserInput.schema';

export const UserInfoUpdateArgsSchema = z.object({
  data: UserInfoInputSchema,
  userId: z.string().cuid(),
});
