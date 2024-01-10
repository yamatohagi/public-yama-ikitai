import {zodResolver} from '@hookform/resolvers/zod';
import {MediaType} from '@prisma/client';
import {useAtom} from 'jotai';
import {useForm} from 'react-hook-form';
import {UserEditInputSchema} from 'server/routers/user/schemas/objects/UserInput.schema';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useAuth} from 'src/hooks/use-auth';

import {defaultInstance} from 'src/service/zodHelper';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';

export type Input = z.infer<typeof UserEditInputSchema>;

export default function useUserForm() {
  const utils = trpc.useUtils();
  const [, setImages] = useAtom(ImagesAndLabelAtom);
  const {userId} = useAuth();
  const scheme = GetSchema(userId);

  const f = utils.user.findFirst.fetch;
  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),

    defaultValues: async (): Promise<ReturnType<typeof getDefaultValue>> => {
      const result = await f({where: {id: userId}}, {staleTime: 0});

      // imageをセット
      const image = {
        blobFile: null,
        previewUrl: result?.image ?? '',
        dbPhotoId: 0,
        type: MediaType.PHOTO,
        width: 0,
        height: 0,
      };

      setImages([image] || []);

      const dValue: (typeof scheme)['_type'] = {
        name: result?.name ?? '',
        userProfileText: result?.userProfileText ?? '',
        userName: result?.userName ?? '',
      };
      return dValue;
    },
  });
  return MtFacilityFormMethods;
}

function getDefaultValue(scheme: typeof UserEditInputSchema) {
  return defaultInstance<typeof scheme>(scheme);
}

function GetSchema(excludeId?: string) {
  const utils = trpc.useUtils();
  const f = utils.user.checkAlready.fetch;
  const schema = UserEditInputSchema.refine(
    async (data) => {
      const response = await f({userName: data.userName, excludeId});
      return !response?.id;
    },
    {
      message: 'すでに存在します。',
      path: ['userName'],
    }
  );
  return schema;
}
