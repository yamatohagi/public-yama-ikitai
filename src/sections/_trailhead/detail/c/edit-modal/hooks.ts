import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {useForm} from 'react-hook-form';
import {intToBooleanNullString, intToBooleanNullStringMax1} from 'server/functions/etc';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {getTrailheadDefaultValue, GetTrailheadSchema} from 'src/sections/_trailhead/create/hooks/useTrailheadForm';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';

export type FormValueType = z.infer<ReturnType<typeof GetTrailheadSchema>>;

export default function useTrailheadForm({id: thId}: {id: number}) {
  const [, setImages] = useAtom(ImagesAndLabelAtom);
  const scheme = GetTrailheadSchema();
  const utils = trpc.useUtils();
  const f = utils.trailhead.findUniqueByEdit.fetch;
  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),

    defaultValues: async (): Promise<ReturnType<typeof getTrailheadDefaultValue>> => {
      const result = await f(
        {id: thId},
        {
          staleTime: 0,
          // これupdate後のdataからキャッシュに入れるといいかも
        }
      );
      // imageをセット
      const resultImages =
        result?.TrailheadToPhoto.map((v, imageIdx) => ({
          blobFile: null,
          type: v.Photo.type,
          previewUrl: v.Photo.original,
          dbPhotoId: v.Photo.id,
          width: v.Photo.width,
          height: v.Photo.height,
        })) || [];
      setImages(resultImages || []);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {Parking, TrailheadRouteGroup, areaId, id, MountainToTrailhead, TrailheadToPhoto, ...rest} = result || {};
      const dValue: (typeof scheme)['_type'] = {
        ...rest,
        name: result?.name || '',
        nameKana: result?.nameKana || '',
        postalCode: result?.postalCode?.toString() || '',
        lat: result?.lat || 0,
        lng: result?.lng || 0,
        mtAreaId: result?.areaId || 0,
        elevation: result?.elevation?.toString() || '',
        myCarReg: intToBooleanNullString(result?.myCarReg),
        toilet: intToBooleanNullStringMax1(result?.toilet),
        vendingMachine: intToBooleanNullStringMax1(result?.vendingMachine),
        store: intToBooleanNullStringMax1(result?.store),
        TrailheadRouteGroup: (result?.TrailheadRouteGroup || []).map((v) => {
          return {
            id: v.id,
            type: v.type,
            remark: v.remark || undefined,
            routes: v.routes.map((v) => {
              return {
                id: v.id,
                name: v.name,
                type: v.type,
                time: v.time?.toString() || undefined,
                methodType: v.methodType || '',
                methodName: v.methodName || undefined,
                payment: v.payment?.toString() || undefined,
                order: v.order,
                url: v.url || undefined,
              };
            }),
          };
        }),
        Parking: (result?.Parking || []).map((v) => {
          return {
            name: v.name,
            nameKana: v.nameKana,
            postalCode: v.postalCode?.toString() || '',
            prefecture: v.prefecture,
            address1: v.address1,
            address2: v.address2,
            address3: v.address3,
            mapLink: v.mapLink,
            timeToTrailhead: v.timeToTrailhead?.toString() || '',
            methodToTh: v.methodToTh || 'walk',
            distanceToTrailhead: v.distanceToTrailhead?.toString() || '',
            feeToTrailhead: v.feeToTrailhead?.toString() || '',
            capacity: v.capacity?.toString() || '',
            dirtRoad: v.dirtRoad,
            feeFree: v.feeFree,
            feeStr: v.feeStr,
            notes: v.notes,
            lat: v.lat,
            lng: v.lng,
          };
        }),
        mtIds: (result?.MountainToTrailhead || []).map((v) => v.mountainId.toString()),
        MountainToTrailhead: (result?.MountainToTrailhead || []).map((th) => ({
          mountainId: th.mountainId.toString(),
          uphillTime: th.uphillTime?.toString() || '',
          uphillDistance: th.uphillDistance?.toString() || '',
          downhillTime: th.downhillTime?.toString() || '',
          downhillDistance: th.downhillDistance?.toString() || '',
        })),
        mtFacilityIds: (result?.TrailheadToMtFacility || []).map((v) => v.mtFacilityId.toString()),
        TrailheadToMtFacility: (result?.TrailheadToMtFacility || []).map((th) => ({
          mtFacilityId: th.mtFacilityId.toString(),
          timeTo: th.timeTo?.toString() || '',
          distanceTo: th.distanceTo?.toString() || '',
          timeFrom: th.timeFrom?.toString() || '',
          distanceFrom: th.distanceFrom?.toString() || '',
          remark: th.remark,
        })),
      };
      return dValue;
    },
  });

  return MtFacilityFormMethods;
}

// defaultValues: async (): Promise<ReturnType<typeof defaultInstance<typeof scheme>>> => {
