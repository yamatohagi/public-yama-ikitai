import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {UserInfoInputSchema} from 'server/routers/user-info/schemas/objects/UserInput.schema';

import {defaultInstance} from 'src/service/zodHelper';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';

export type Input = z.infer<typeof UserInfoInputSchema>;

export default function useUserInfoForm() {
  const utils = trpc.useUtils();

  const scheme = UserInfoInputSchema;

  const f = utils.userInfo.findOne.fetch;
  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),

    defaultValues: async (): Promise<ReturnType<typeof getDefaultValue>> => {
      const result = await f(undefined, {staleTime: 0});

      const dValue: (typeof scheme)['_type'] = {
        startPointLat: result?.startPointLat?.toString() || null,
        startPointLng: result?.startPointLng?.toString() || null,
        startPointLabel: result?.startPointLabel || '',
        dayMoveMaxTime: result?.dayMoveMaxTime?.toString() || null,
        stayStartTime: result?.stayStartTime || '',
        startDayOfWeek: result?.startDayOfWeek?.toString() || null,
        coordinatesRadius: result?.coordinatesRadius?.toString() || null,
      };
      return dValue;
    },
  });
  return MtFacilityFormMethods;
}

function getDefaultValue(scheme: typeof UserInfoInputSchema) {
  return defaultInstance<typeof scheme>(scheme);
}
