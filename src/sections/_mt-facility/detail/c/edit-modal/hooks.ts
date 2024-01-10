/* eslint-disable @typescript-eslint/no-unused-vars */
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {useForm} from 'react-hook-form';
import {formatDate, intToBooleanNull} from 'server/functions/etc';
import {MtFacilityCreateInputSchema} from 'server/routers/mt-facility/schemas/objects/MtFacilityCreateInput.schema';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {getDefaultValue} from 'src/sections/_mt-facility/create/hooks/useMtFacilityForm';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';

function GetSchema() {
  const utils = trpc.useUtils();
  const f = utils.mountains.checkAlready.fetch;
  const frontMountainCreateInputObjectSchema = MtFacilityCreateInputSchema.refine(
    async (data) => {
      if (!data.lat || !data.lng || !data.name) return false;
      const response = await f({lat: data.lat, lng: data.lng, name: data.name});
      return !response?.id;
    },
    (data) => ({
      message: data.lat && data.lng ? '緯度、経度、名前の組み合わせがすでに存在します。' : '住所検索から場所を選択してください',
      path: ['name'], // エラーメッセージを関連付けるフィールド
    })
  );
  return frontMountainCreateInputObjectSchema;
}

export type MtFacilityInput = z.infer<ReturnType<typeof GetSchema>>;

export default function useMtFacilityForm({mtFacilityId}: {mtFacilityId: number}) {
  const [, setImages] = useAtom(ImagesAndLabelAtom);
  const scheme = GetSchema();
  const utils = trpc.useUtils();
  const f = utils.mtFacilities.findUniqueByEdit.fetch;
  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),

    defaultValues: async (): Promise<ReturnType<typeof getDefaultValue>> => {
      const result = await f(
        {
          id: mtFacilityId,
        },
        {
          staleTime: 0,
          // これupdate後のdataからキャッシュに入れるといいかも
        }
      );

      // imageをセット
      const resultImages =
        result?.MtFacilityToPhoto.map((v, imageIdx) => ({
          blobFile: null,
          previewUrl: v.Photo.original,
          dbPhotoId: v.Photo.id,
          width: v.Photo.width,
          type: v.Photo.type,
          height: v.Photo.height,
        })) || [];
      setImages(resultImages || []);

      const {
        MtFacilityToMtFacilityType,
        MtFacilityToPayMethod,
        MtFacilityToRsvMethod,
        Area,
        TrailheadToMtFacility,
        MountainToMtFacility,
        BusinessPeriod,
        areaId,
        MtFacilityToPhoto,
        ...rest
      } = result || {};
      const dValue: (typeof scheme)['_type'] = {
        ...rest,
        name: result?.name || '',
        nameKana: result?.nameKana || '',
        postalCode: result?.postalCode?.toString() || '',
        lat: result?.lat || 0,
        lng: result?.lng || 0,
        docomo: result?.docomo?.toString() || '',
        au: result?.au?.toString() || '',
        softbank: result?.softbank?.toString() || '',
        rakuten: result?.rakuten?.toString() || '',
        listElevation: result?.listElevation?.toString() || '',
        tStay: intToBooleanNull(result?.tStay) || null,
        tCafeSpace: intToBooleanNull(result?.tCafeSpace) || null,
        tTent: intToBooleanNull(result?.tTent) || null,
        tShop: intToBooleanNull(result?.tShop) || null,
        tToilet: intToBooleanNull(result?.tToilet) || null,
        tBathSink: intToBooleanNull(result?.tBathSink) || null,
        tChangingRoom: intToBooleanNull(result?.tChangingRoom) || null,
        tDryRoom: intToBooleanNull(result?.tDryRoom) || null,
        tBath: intToBooleanNull(result?.tBath) || null,
        tWave: intToBooleanNull(result?.tWave) || null,
        tWifi: intToBooleanNull(result?.tWifi) || null,
        tPublicPhone: intToBooleanNull(result?.tPublicPhone) || null,
        tKitchen: intToBooleanNull(result?.tKitchen) || null,
        tTalkRoom: intToBooleanNull(result?.tTalkRoom) || null,
        tOther: intToBooleanNull(result?.tOther) || null,
        MtFacilityTypeIds: result?.MtFacilityToMtFacilityType?.map((v) => v.mtFacilityTypeId) || [],
        PayMethodIds: result?.MtFacilityToPayMethod?.map((v) => v.payMethodId) || [],
        RsvMethodIds: result?.MtFacilityToRsvMethod?.map((v) => v.rsvMethodId) || [],
        mtAreaId: result?.Area?.id || 0,
        TrailheadToMtFacility: (result?.TrailheadToMtFacility || []).map((trailhead) => ({
          ...trailhead,
          trailheadId: trailhead.trailheadId,
          timeTo: trailhead.timeTo?.toString() || '',
          distanceTo: trailhead.distanceTo?.toString() || '',
          timeFrom: trailhead.timeFrom?.toString() || '',
          distanceFrom: trailhead.distanceFrom?.toString() || '',
        })),
        MountainToMtFacility: (result?.MountainToMtFacility || []).map((mountain) => ({
          ...mountain,
          mountainId: mountain.mountainId,
          timeTo: mountain.timeTo?.toString() || '',
          distanceTo: mountain.distanceTo?.toString() || '',
          timeFrom: mountain.timeFrom?.toString() || '',
          distanceFrom: mountain.distanceFrom?.toString() || '',
        })),

        BusinessPeriod: (result?.BusinessPeriod || []).map((period) => ({
          year: period.year || '',
          start: formatDate(period.start),
          end: formatDate(period.end),
        })),
      };
      return dValue;
    },
  });

  return MtFacilityFormMethods;
}

// defaultValues: async (): Promise<ReturnType<typeof defaultInstance<typeof scheme>>> => {
