import MediaTypeSchema from 'generated/schema/zod/inputTypeSchemas/MediaTypeSchema';
import MethodToThTypeSchema from 'generated/schema/zod/inputTypeSchemas/MethodToThTypeSchema';
import MethodTypeSchema from 'generated/schema/zod/inputTypeSchemas/MethodTypeSchema';
import SegmentTypeSchema from 'generated/schema/zod/inputTypeSchemas/SegmentTypeSchema';
import TrailheadRouteGroupTypeSchema from 'generated/schema/zod/inputTypeSchemas/TrailheadRouteGroupTypeSchema';
import {postalCodeRegExp} from 'src/utils/regex';
import {z} from 'zod';

const TrailheadRouteSchema = z.object({
  name: z.string(),
  type: z.lazy(() => SegmentTypeSchema),
  time: z
    .string()
    .regex(/^([0-9]*|)$/, {message: '時間を入力してください'})
    .optional(),
  methodType: z.lazy(() => MethodTypeSchema.or(z.literal(''))),
  methodName: z.string().optional(),
  // todo:paymentに0が入るとおかしくなる
  payment: z
    .string()
    .regex(/^([0-9]*|)$/, {message: '料金は数字で入力してください'})
    .optional(),
  order: z.number(),
  url: z.string().optional(),
});

export const TrailheadToMtFacility = z.object({
  timeTo: z.string().optional(),
  distanceTo: z.string().optional(),
  timeFrom: z.string().optional(),
  distanceFrom: z.string().optional(),
  remark: z.string().optional().nullable(),
  mtFacilityId: z.string(),
});

export const MountainToTrailhead = z.object({
  mountainId: z.string(),
  uphillTime: z.string().optional(),
  uphillDistance: z.string().optional(),
  downhillTime: z.string().optional(),
  downhillDistance: z.string().optional(),
});

export const TrailheadRouteGroupSchema = z.object({
  type: z.lazy(() => TrailheadRouteGroupTypeSchema),
  remark: z.string().optional(),
  routes: z.array(TrailheadRouteSchema),
});

export const MtToThInfoSchema = z.object({
  mtId: z.string(),
  uphillTime: z.string().optional(),
  uphillDistance: z.string().optional(),
  downhillTime: z.string().optional(),
  downhillDistance: z.string().optional(),
});

export const ParkingSchema = z.object({
  name: z.string(),
  nameKana: z.string(),
  postalCode: z.string().regex(postalCodeRegExp, {message: '正しい郵便番号を入力してください'}),
  prefecture: z.string().optional().nullable(),
  address1: z.string().optional().nullable(),
  address2: z.string().optional().nullable(),
  address3: z.string().optional().nullable(),
  mapLink: z.string().optional().nullable(),
  timeToTrailhead: z.string().regex(/^([0-9]*|)$/, {message: '数字で入力してください'}),
  methodToTh: MethodToThTypeSchema.default(MethodToThTypeSchema.enum.walk),
  distanceToTrailhead: z.string().regex(/^([0-9]*|)$/, {message: '数字で入力してください'}),
  feeToTrailhead: z.string().regex(/^([0-9]*|)$/, {message: '数字で入力してください'}),
  capacity: z.string().regex(/^([0-9]*|)$/, {message: '数字で入力してください'}),
  dirtRoad: z.boolean().optional().nullable(),
  feeFree: z.boolean().optional().nullable(),
  feeStr: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
});

const Schema = z
  .object({
    Parking: z.array(ParkingSchema).optional(),
    TrailheadRouteGroup: z.array(TrailheadRouteGroupSchema).optional(),
    name: z.string().nonempty('山名を入力してください'),
    nameKana: z.string().default(''),
    intro: z.string().optional().nullable(),
    elevation: z.string().regex(/^([0-9]*|)$/, {message: '標高を数字で入力してください'}),
    lat: z.number().nonnegative('住所検索から場所を選択してください'),
    lng: z.number().nonnegative('住所検索から場所を選択してください'),
    postalCode: z.string().regex(postalCodeRegExp, {message: '正しい郵便番号を入力してください'}),
    prefecture: z.string().optional().nullable(),
    address1: z.string().optional().nullable(),
    address2: z.string().optional().nullable(),
    address3: z.string().optional().nullable(),
    lastConbiniName: z.string().optional().nullable(),
    lastConbiniNameKana: z.string().optional().nullable(),
    lastConbiniLat: z.number().optional().nullable(),
    lastConbiniLng: z.number().optional().nullable(),
    popularRating: z.number().optional().nullable(),
    hpRating: z.number().optional().nullable(),
    myCarReg: z.enum(['', '0', '1', '2']).optional().nullable().default(''),
    intensity: z.number().optional().nullable(),
    view: z.number().optional().nullable(),
    toilet: z.enum(['', '0', '1']).optional().nullable().default(''),
    vendingMachine: z.enum(['', '0', '1']).optional().nullable().default(''),
    store: z.enum(['', '0', '1']).optional().nullable().default(''),
    remark: z.string().optional().nullable(),
    roadblockInfo: z.string().optional().nullable(),
    roadblockStart: z.coerce.date().optional().nullable().default(null),
    roadblockEnd: z.coerce.date().optional().nullable().default(null),
    mtAreaId: z.number({invalid_type_error: 'エリアを選択してください'}).positive('エリアを選択してください'),
    mtIds: z.array(z.string()).optional().nullable(),
    // images: z
    //   .array(
    //     z.object({
    //       title: z.string().max(25, 'タイトルは25文字以内で入力してください。'),
    //       thumbnail: z.string(),
    //       original: z.string(),
    //       type: MediaTypeSchema,
    //     })
    //   )
    //   .optional()
    //   .nullable(),
    imageSelectTitle: z.array(z.string().max(25, 'タイトルは25文字以内で入力してください。').optional().nullable()).optional().nullable(),
    MountainToTrailhead: z.array(MountainToTrailhead).optional(),
    mtFacilityIds: z.array(z.string()).optional().nullable(),
    TrailheadToMtFacility: z.array(TrailheadToMtFacility).optional(),

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

    // MountainToTrailhead: z.lazy(() => MountainTrailheadCreateNestedManyWithoutTrailheadInputObjectSchema).optional(),
    // TrailheadRating: z.lazy(() => TrailheadRatingCreateNestedManyWithoutTrailheadInputObjectSchema).optional(),
    // Parking: z.lazy(() => ParkingCreateNestedManyWithoutTrailheadInputObjectSchema).optional(),
    // Area: z.lazy(() => AreaCreateNestedOneWithoutTrailheadInputObjectSchema).optional(),
    // TrailheadRouteGroup: z.lazy(() => TrailheadRouteGroupCreateNestedManyWithoutTrailheadInputObjectSchema).optional(),
    // TrailheadToPhoto: z.lazy(() => TrailheadToPhotoCreateNestedManyWithoutTrailheadInputObjectSchema).optional(),
    // AfterClimbMeal: z.lazy(() => AfterClimbMealCreateNestedManyWithoutTrailheadInputObjectSchema).optional(),
    // AfterClimbSpa: z.lazy(() => AfterClimbSpaCreateNestedManyWithoutTrailheadInputObjectSchema).optional(),
  })
  .strict();

export const TrailheadCreateInputObjectSchema = Schema;
