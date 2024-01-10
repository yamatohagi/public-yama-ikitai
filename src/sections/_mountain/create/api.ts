import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {trpc} from 'src/utils/trpc';

export const useCreateMtMutation = () => {
  const router = useRouter();
  const createOne = trpc.mountains.upsertRequest.useMutation({
    // create後に詳細ページに遷移する
    // onSuccess: (data) => {
    //   router.push(`/${paths.mountain.index.path}/${data.id}`);
    // },
  });

  return {
    createOne,
  };
};
