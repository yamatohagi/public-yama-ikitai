import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {trpc} from 'src/utils/trpc';

export const RemovePost = (id: number) => {
  const router = useRouter();
  const removePost = trpc.post.deleteOne.useMutation({
    onSuccess: () => {
      router.push(paths.post.index.path);
    },
  });

  return removePost;
};
