import {zodResolver} from '@hookform/resolvers/zod';

import {useForm} from 'react-hook-form';
import {MtFacilityCreateInputSchema} from 'server/routers/mt-facility/schemas/objects/MtFacilityCreateInput.schema';
import {defaultInstance} from 'src/service/zodHelper';
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

export default function useMtFacilityForm() {
  const scheme = GetSchema();

  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),
    defaultValues: getDefaultValue(scheme),
  });

  return MtFacilityFormMethods;
}

export function getDefaultValue(scheme: ReturnType<typeof GetSchema>) {
  return {
    ...defaultInstance<typeof scheme>(scheme),
  };
}
