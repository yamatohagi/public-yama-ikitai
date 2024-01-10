/* eslint-disable @typescript-eslint/no-unused-vars */
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import _ from 'lodash';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';

import {GetMtSchema, getMtDefaultValue} from 'src/sections/_mountain/create/hooks/useMountainForm';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';

export type MtInput = z.infer<ReturnType<typeof GetMtSchema>>;

export default function useMountainForm({mtId, originId}: {mtId: number; originId?: number}) {
  const [, setImages] = useAtom(ImagesAndLabelAtom);
  const [diff, setDiff] = useState<{
    [key: string]: any;
  }>({
    createdAt: null,
    updatedAt: null,
    id: null,
  });
  const [reDiff, setReDiff] = useState<{
    [key: string]: any;
  }>({
    createdAt: null,
    updatedAt: null,
    id: null,
  });

  const scheme = GetMtSchema(originId || mtId);
  const utils = trpc.useUtils();
  const f = utils.mountains.findUniqueByEdit.fetch;
  const methods = useForm({
    resolver: zodResolver(scheme),

    defaultValues: async (): Promise<ReturnType<typeof getMtDefaultValue>> => {
      const result = await f(
        {id: mtId},
        {
          staleTime: 0,
          // これupdate後のdataからキャッシュに入れるといいかも
        }
      );

      // imageをセット
      const resultImages =
        result?.MountainToPhoto.map((v, imageIdx) => ({
          blobFile: null,
          previewUrl: v.Photo.original,
          dbPhotoId: v.Photo.id,
          width: v.Photo.width,
          height: v.Photo.height,
          type: v.Photo.type,
          labels:
            v.Photo.MountainToPhoto.map((v, labelIdx) => ({
              x: v.labelLeft || 0,
              y: v.labelTop || 0,
              text: v.Mountain.name || '',
              url: v.Photo.original || '',
              index: labelIdx,
              mtId: v.Mountain.id || 0,
              width: v.Photo.width,
              height: v.Photo.height,
              imageIdx,
              labelIdx,
            })) || [],
        })) || [];

      setImages(resultImages || []);

      // originIdがあるときは承認の工程なので、差分を取得する
      if (originId) {
        const afterResult = _.cloneDeep(result); //  copy
        // MountainToPhoto.Photo.id を削除
        _.forEach(afterResult.MountainToPhoto, (item) => {
          if (item.Photo) {
            delete (item.Photo as any).id;
          }
          if (item.Mountain) {
            delete (item.Mountain as any).id;
          }
        });

        const beforeResult = await f({id: originId}, {staleTime: 0});
        // MountainToPhoto.Photo.id を削除
        _.forEach(beforeResult.MountainToPhoto, (item) => {
          if (item.Photo) {
            delete (item.Photo as any).id;
          }
          if (item.Mountain) {
            delete (item.Mountain as any).id;
          }
        });

        // 更新されたプロパティの配列を得る。（https://stackoverflow.com/a/31686152）
        const diffProps = _.reduce(
          afterResult,
          (result, value, key) => {
            return _.isEqual(value, (beforeResult as any)[key]) ? result : result.concat(key as any);
          },
          []
        );

        const reDiffProps = _.reduce(
          beforeResult,
          (resultArr, value, key) => {
            return _.isEqual(value, (afterResult as any)[key]) ? resultArr : resultArr.concat(key as any);
          },
          []
        );

        // 値が更新されたプロパティと、それらのobjectBでの値を持つオブジェクトを作成
        // 値が更新されたプロパティと、それらのオブジェクトAでの値を持つオブジェクトを作成
        const diffObj = deepDiff(beforeResult, afterResult);

        // 値が更新されたプロパティと、それらのオブジェクトBでの値を持つオブジェクトを作成
        const reDiffObj = deepDiff(afterResult, beforeResult);

        // const diffObj = diffProps.reduce((obj, prop) => {
        //   obj[prop] = beforeResult[prop];
        //   return obj;
        // }, {});

        // const reDiffObj = reDiffProps.reduce((obj, prop) => {
        //   obj[prop] = afterResult[prop];
        //   return obj;
        // }, {});

        // diffObj と reDiffObj から特定のプロパティを除外する前に、プロパティが存在するか確認する
        if ('createdAt' in diffObj && 'updatedAt' in diffObj && 'id' in diffObj) {
          const {createdAt, updatedAt, id, ...rest} = diffObj;
          // ここで rest を使用
          setDiff(rest);
        }

        if ('createdAt' in reDiffObj && 'updatedAt' in reDiffObj && 'id' in reDiffObj) {
          const {createdAt: reCreatedAt, updatedAt: reUpdatedAt, id: reId, ...reRest} = reDiffObj;
          // ここで reRest を使用
          setReDiff(reRest);
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {MountainToTrailhead, MountainToMtFacility, Area, areaId, id, createdAt, updatedAt, deletedAt, MountainToPhoto, ...rest} = result || {};
      const dValue: (typeof scheme)['_type'] = {
        ...rest,
        name: result?.name || '',
        nameKana: result?.nameKana || '',
        postalCode: result?.postalCode?.toString() || '',
        lat: result?.lat || 0,
        lng: result?.lng || 0,
        mtAreaId: result?.areaId || 0,
        elevation: result?.elevation?.toString() || '',
        trailheadIds: result?.MountainToTrailhead?.map((v) => v.trailheadId.toString()) || [],
        mtFacilityIds: result?.MountainToMtFacility?.map((v) => v.mtFacilityId.toString()) || [],
        MtToThInfos: (result?.MountainToTrailhead || []).map((th) => ({
          trailheadId: th.trailheadId.toString(),
          uphillTime: th.uphillTime?.toString() || '',
          uphillDistance: th.uphillDistance?.toString() || '',
          downhillTime: th.downhillTime?.toString() || '',
          downhillDistance: th.downhillDistance?.toString() || '',
        })),
        MountainToMtFacility: (result?.MountainToMtFacility || []).map((th) => ({
          mtFacilityId: th.mtFacilityId.toString(),
          timeFrom: th.timeFrom?.toString() || '',
          distanceFrom: th.distanceFrom?.toString() || '',
          timeTo: th.timeTo?.toString() || '',
          distanceTo: th.distanceTo?.toString() || '',
        })),
      };
      return dValue;
    },
  });
  return {methods, diff, reDiff};
}

// defaultValues: async (): Promise<ReturnType<typeof defaultInstance<typeof scheme>>> => {

function deepDiff(obj1: any, obj2: any) {
  const diff: any = {};

  _.forEach(obj1, (value, key) => {
    if (!_.isEqual(value, obj2[key])) {
      if (_.isObject(value) && _.isObject(obj2[key])) {
        const deepObjDiff = deepDiff(value, obj2[key]);

        diff[key] = deepObjDiff;
      } else {
        diff[key] = value;
      }
    }
  });

  return diff;
}
