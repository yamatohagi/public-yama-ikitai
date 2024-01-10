import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {trpc} from 'src/utils/trpc';

export const useCreateMtMutation = () => {
  const router = useRouter();

  const createOne = trpc.mtFacilities.create.useMutation({
    // create後に詳細ページに遷移する
    // onSuccess: (data) => {
    //   router.push(`/${paths.mtFacility.index.path}/${data.id}`);
    // },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {
    createOne,
  };
};
