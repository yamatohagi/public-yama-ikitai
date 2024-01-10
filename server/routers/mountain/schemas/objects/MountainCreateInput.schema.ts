import MediaTypeSchema from 'generated/schema/zod/inputTypeSchemas/MediaTypeSchema';
import {postalCodeRegExp} from 'src/utils/regex';
import {z} from 'zod';

export const MtToThInfoSchema = z.object({
  trailheadId: z.string(),
  uphillTime: z.string().optional(),
  uphillDistance: z.string().optional(),
  downhillTime: z.string().optional(),
  downhillDistance: z.string().optional(),
});

export const MountainToMtFacilityCreateWithoutMtFacilityInputSchema = z.object({
  timeTo: z.string().optional(),
  distanceTo: z.string().optional(),
  timeFrom: z.string().optional(),
  distanceFrom: z.string().optional(),
  remark: z.string().optional().nullable(),
  mtFacilityId: z.string(),
});

const Schema = z
  .object({
    name: z.string().nonempty('山名を入力してください'),
    nameKana: z.string().nonempty('山名カナを入力してください'),
    MtToThInfos: z.array(MtToThInfoSchema).optional(),
    MountainToMtFacility: z.array(MountainToMtFacilityCreateWithoutMtFacilityInputSchema).optional(),
    mtArea: z.string().optional().nullable(),
    postalCode: z.string().regex(postalCodeRegExp, {message: '正しい郵便番号を入力してください'}),
    prefecture: z.string().optional().nullable(),
    address1: z.string().optional().nullable(),
    address2: z.string().optional().nullable(),
    address3: z.string().optional().nullable(),
    lat: z.number().positive('住所検索から場所を選択してください'),
    lng: z.number().positive('住所検索から場所を選択してください'),
    hyakumeizanStatus: z.boolean().optional().nullable(),
    nihyakumeizanStatus: z.boolean().optional().nullable(),
    stay0n1d: z.boolean().optional().nullable(),
    stay1n2d: z.boolean().optional().nullable(),
    stay2n3d: z.boolean().optional().nullable(),
    stay3n4d: z.boolean().optional().nullable(),

    elevation: z.string().regex(/^([0-9]*|)$/, {message: '標高を数字で入力してください'}),
    appealPoint: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    mtAreaId: z.number({invalid_type_error: 'エリアを選択してください'}).positive('エリアを選択してください'),
    trailheadIds: z.array(z.string()).optional().nullable(),
    mtFacilityIds: z.array(z.string()).optional().nullable(),
    images: z
      .array(
        z.object({
          title: z.string().max(25, 'タイトルは25文字以内で入力してください。'),
          thumbnail: z.string(),
          original: z.string(),
          dbPhotoId: z.number().optional().nullable(),
          type: MediaTypeSchema,
          width: z.number(),
          height: z.number(),
          labels: z
            .array(
              z.object({
                x: z.number(),
                y: z.number(),
                text: z.string(),
                index: z.number(),
                mtId: z.number().optional().nullable(),
              })
            )
            .optional(),
        })
      )
      .optional()
      .nullable(),
    imageSelectTitle: z.array(z.string().max(25, 'タイトルは25文字以内で入力してください。').optional().nullable()).optional().nullable(),
  })
  .strict();

export const MountainCreateInputObjectSchema = Schema;
