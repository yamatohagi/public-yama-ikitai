import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {MountainCreateInputObjectSchema} from 'server/routers/mountain/schemas/objects/MountainCreateInput.schema';
import {defaultInstance} from 'src/service/zodHelper';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';

export function GetMtSchema(excludeId?: number) {
  const utils = trpc.useUtils();
  const f = utils.mountains.checkAlready.fetch;
  const frontMountainCreateInputObjectSchema = MountainCreateInputObjectSchema.refine(
    async (data) => {
      if (!data.lat || !data.lng || !data.name) return false;
      const response = await f({lat: data.lat, lng: data.lng, name: data.name, excludeId});
      return !response?.id;
    },
    {
      message: '緯度、経度、名前の組み合わせがすでに存在します。',
      path: ['name'], // エラーメッセージを関連付けるフィールド
    }
  );
  return frontMountainCreateInputObjectSchema;
}

export type MountainInput = z.infer<ReturnType<typeof GetMtSchema>>;

export default function useMountainForm() {
  const scheme = GetMtSchema();
  const mountainFormMethods = useForm({
    resolver: zodResolver(scheme),
    defaultValues: getMtDefaultValue(scheme),
  });

  return mountainFormMethods;
}

export function getMtDefaultValue(scheme: ReturnType<typeof GetMtSchema>) {
  return {
    ...defaultInstance<typeof scheme>(scheme),
  };
}
