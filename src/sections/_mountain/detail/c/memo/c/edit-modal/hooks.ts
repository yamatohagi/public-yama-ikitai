import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {MtUrlMemoSchema} from 'server/routers/mt-url-memo/schemas/objects/MountainCreateInput.schema';
import {defaultInstance} from 'src/service/zodHelper';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';

export type MtUrlMemoInput = z.infer<typeof MtUrlMemoSchema>;

export default function useMtMemoForm({mtId}: {mtId: number}) {
  const utils = trpc.useUtils();

  const scheme = MtUrlMemoSchema;

  const f = utils.mtUrlMemo.findMany.fetch;
  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),

    defaultValues: async (): Promise<ReturnType<typeof getDefaultValue>> => {
      const result = await f({where: {mountainId: mtId}}, {staleTime: 0});

      const dValue: (typeof scheme)['_type'] = {
        MtUrlMemo: result.map((v) => {
          return {
            name: v.name,
            url: v.url,
          };
        }),
      };
      return dValue;
    },
  });
  return MtFacilityFormMethods;
}

function getDefaultValue(scheme: typeof MtUrlMemoSchema) {
  return defaultInstance<typeof scheme>(scheme);
}
