import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

function GetSchema() {
  const postCreateSchema = z.object({
    content: z.string().max(300, '備考は300文字以内で入力してください'),
  });
  return postCreateSchema;
}

export type PostInput = z.infer<ReturnType<typeof GetSchema>>;

export default function usePostCreateForm() {
  const scheme = GetSchema();

  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),
    defaultValues: {
      content: '',
    },
  });

  return MtFacilityFormMethods;
}
