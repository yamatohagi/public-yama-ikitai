import {z} from 'zod';

export const CheckAlreadySchema = z.object({
  lat: z.number().positive('住所検索から場所を選択してください'),
  lng: z.number().positive('住所検索から場所を選択してください'),
  name: z.string().nonempty('山名を入力してください'),
  excludeId: z.number().optional(),
});
