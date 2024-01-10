import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {defaultInstance} from 'src/service/zodHelper';

function GetSchema() {
  const postCreateSchema = z.object({
    content: z.string().max(300, '備考は300文字以内で入力してください'),
    mtId: z.number().nullable(),
    mtFacilityId: z.number().nullable(),
    trailheadId: z.number().nullable(),
    hashtagIds: z.array(z.string()).nullable(),
  });
  return postCreateSchema;
}

export type PostInput = z.infer<ReturnType<typeof GetSchema>>;

export default function usePostCreateForm() {
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
