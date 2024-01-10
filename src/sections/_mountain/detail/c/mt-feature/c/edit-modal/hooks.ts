import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {defaultInstance} from 'src/service/zodHelper';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';
import {EditModalState} from './state';

type UseMtFacilityFormProps = {
  mtId: number;
  modalState: ReturnType<typeof EditModalState>;
};

export default function useMtFacilityForm({mtId, modalState}: UseMtFacilityFormProps) {
  const {
    modalProps: {remarkColumName},
  } = modalState;
  const scheme = GetSchema();
  const utils = trpc.useUtils();
  const f = utils.mountainFeature.findFirst.fetch;
  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),
    defaultValues: async (): Promise<ReturnType<typeof defaultInstance<typeof scheme>>> => {
      if (!remarkColumName) {
        throw new Error('remarkColumName is null');
      }
      const result = await f(
        {
          mtId,
          pick: [remarkColumName],
        },
        {
          staleTime: 0,
          // これupdate後のdataからキャッシュに入れるといいかも
        }
      );
      return {
        remark: result?.[remarkColumName] || '',
      };
    },
  });

  return MtFacilityFormMethods;
}

function GetSchema() {
  const frontMountainCreateInputObjectSchema = z.object({
    remark: z.string().max(100, '備考は100文字以内で入力してください'),
  });
  return frontMountainCreateInputObjectSchema;
}

export type FormInputType = z.infer<ReturnType<typeof GetSchema>>;
