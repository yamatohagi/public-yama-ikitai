/* eslint-disable @typescript-eslint/no-unused-vars */

import MediaTypeSchema from 'generated/schema/zod/inputTypeSchemas/MediaTypeSchema';
import {dateToISOString} from 'server/functions/etc';
import {postalCodeRegExp} from 'src/utils/regex';
import {z} from 'zod';

export const TrailheadToMtFacilityCreateWithoutMtFacilityInputSchema = z.object({
  timeTo: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  distanceTo: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  timeFrom: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  distanceFrom: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  remark: z.string().optional().nullable(),
  trailheadId: z.number().positive('登山口を選択してください'),
});

export const MountainToMtFacilityCreateWithoutMtFacilityInputSchema = z.object({
  timeTo: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  distanceTo: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  timeFrom: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  distanceFrom: z.string().regex(/^([0-9]*|)$/, {message: '数字のみで入力してください'}),
  remark: z.string().optional().nullable(),
  mountainId: z.number().positive('山を選択してください'),
});

export const BusinessPeriodCreateWithoutMtFacilityInputSchema = z.object({
  year: z.string(),
  start: z.string().transform(dateToISOString).default(''),
  end: z.string().transform(dateToISOString).default(''),
});

const Schema = z
  .object({
    name: z.string().nonempty('山名を入力してください'),
    nameKana: z.string(),

    postalCode: z.string().regex(postalCodeRegExp, {message: '正しい郵便番号を入力してください'}),
    prefecture: z.string().optional().nullable(),
    address1: z.string().optional().nullable(),
    address2: z.string().optional().nullable(),
    address3: z.string().optional().nullable(),
    lat: z.number().positive('住所検索から場所を選択してください'),
    lng: z.number().positive('住所検索から場所を選択してください'),
    MtFacilityTypeIds: z.array(z.number()).optional().nullable(),
    PayMethodIds: z.array(z.number()).optional().nullable(),
    RsvMethodIds: z.array(z.number()).optional().nullable(),
    docomo: z.string().regex(/^([0-9]*|)$/, {message: '値を正しく選択してください'}),
    au: z.string().regex(/^([0-9]*|)$/, {message: '値を正しく選択してください'}),
    softbank: z.string().regex(/^([0-9]*|)$/, {message: '値を正しく選択してください'}),
    rakuten: z.string().regex(/^([0-9]*|)$/, {message: '値を正しく選択してください'}),

    remark: z.string().optional().nullable(),
    inTFlag: z.number().int().optional().nullable(),
    inTCleanRating: z.number().optional().nullable(),
    inTRemark: z.string().optional().nullable(),
    outTFlag: z.number().int().optional().nullable(),
    outTCleanRating: z.number().optional().nullable(),
    outTRemark: z.string().optional().nullable(),
    bathSinkFlag: z.number().int().optional().nullable(),
    bathSinkCleanRating: z.number().optional().nullable(),
    bathSinkRemark: z.string().optional().nullable(),
    talkRoomFlag: z.number().int().optional().nullable(),
    talkRoomCleanRating: z.number().optional().nullable(),
    talkRoomRemark: z.string().optional().nullable(),
    dryRoomFlag: z.number().int().optional().nullable(),
    dryRoomCleanRating: z.number().optional().nullable(),
    dryRoomRemark: z.string().optional().nullable(),
    cafeSpaceRoomFlag: z.number().int().optional().nullable(),
    cafeSpaceRoomCleanRating: z.number().optional().nullable(),
    cafeSpaceRoomRemark: z.string().optional().nullable(),
    bashRoomFlag: z.number().int().optional().nullable(),
    bashRoomCleanRating: z.number().optional().nullable(),
    bashRoomRemark: z.string().optional().nullable(),
    listTimeRemark: z.string().nullable(),
    listCapacityTent: z.number().int().nullable(),
    listCapacityHut: z.number().int().nullable(),
    listFeeTent: z.number().int().nullable(),
    listFeeHut: z.number().int().nullable(),
    listFeeHut2: z.number().int().nullable(),
    listTelOffice: z.string().nullable(),
    listTelLocal: z.string().nullable(),
    listHp: z.string().nullable(),

    listElevation: z.string().regex(/^([0-9]*|)$/, {message: '標高を数字で入力してください'}),
    listConnectionRemark: z.string().optional().nullable(),

    tStay: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tCafeSpace: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tTent: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tShop: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tToilet: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tBathSink: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tChangingRoom: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tDryRoom: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tBath: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tWave: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tWifi: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tPublicPhone: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tKitchen: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tTalkRoom: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),
    tOther: z.union([z.literal('null'), z.literal('true'), z.literal('false')]).default('null'),

    TrailheadToMtFacility: z.array(TrailheadToMtFacilityCreateWithoutMtFacilityInputSchema),
    MountainToMtFacility: z.array(MountainToMtFacilityCreateWithoutMtFacilityInputSchema),
    BusinessPeriod: z.array(BusinessPeriodCreateWithoutMtFacilityInputSchema),
    mtArea: z.string().optional().nullable(),

    mtAreaId: z.number({invalid_type_error: 'エリアを選択してください'}).positive('エリアを選択してください'),
    trailheadIds: z.array(z.string()).optional().nullable(),
    images: z
      .array(
        z.object({
          title: z.string().max(25, 'タイトルは25文字以内で入力してください。'),
          thumbnail: z.string(),
          original: z.string(),
          dbPhotoId: z.number().optional().nullable(),
          width: z.number(),
          height: z.number(),
          type: MediaTypeSchema,
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

export const MtFacilityCreateInputSchema = Schema;
