import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {defaultInstance} from 'src/service/zodHelper';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';
import {useModalState} from 'src/components/provider/useModalStateJotai';
import {FacilitySpecificItemEditModalAtom} from './atom';

function GetSchema() {
  const frontMountainCreateInputObjectSchema = z.object({
    remark: z.string().max(100, '備考は100文字以内で入力してください'),
    flag: z.enum(['', '0', '1']).default(''),
  });
  return frontMountainCreateInputObjectSchema;
}

export type MtFacilityInput = z.infer<ReturnType<typeof GetSchema>>;

export default function useMtFacilityForm() {
  const {modalProps} = useModalState(FacilitySpecificItemEditModalAtom);
  const {editProps, mtFacilityId} = modalProps;

  const scheme = GetSchema();
  const utils = trpc.useUtils();
  const f = utils.mtFacilities.findFirst.fetch;
  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),
    defaultValues: async (): Promise<ReturnType<typeof defaultInstance<typeof scheme>>> => {
      const result = await f(
        {
          select: {
            [editProps.remarkColumName]: true,
            [editProps.flagColumName]: true,
          },
          where: {
            id: {equals: mtFacilityId},
          },
        },
        {
          staleTime: 0,
          // これupdate後のdataからキャッシュに入れるといいかも
        }
      );
      const flag = result?.[editProps.flagColumName];
      const remark = result?.[editProps.remarkColumName];

      const flagResult = (flag: string | number | Date | null | undefined) => {
        if (flag === 0) return '0';
        if (flag === 1) return '1';
        return '';
      };

      return result
        ? {
            remark: typeof remark === 'string' ? remark : '',
            // eslint-disable-next-line no-nested-ternary
            flag: flagResult(flag),
          }
        : defaultInstance<typeof scheme>(scheme);
    },
  });

  return MtFacilityFormMethods;
}
