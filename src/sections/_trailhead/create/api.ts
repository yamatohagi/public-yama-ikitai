import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {trpc} from 'src/utils/trpc';

export const useCreateTrailheadMutation = () => {
  const router = useRouter();
  const create = trpc.trailhead.create.useMutation({
    // create後に詳細ページに遷移する
    // onSuccess: (data) => {
    //   router.push(`/${paths.trailhead.index.path}/${data.id}`);
    // },
  });

  return {create};
};
