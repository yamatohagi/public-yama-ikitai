/* eslint-disable import/no-named-as-default */
import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {PostDetailGetTspAtom} from './state';

export const PostDetailGet = () => {
  // idを取得する
  const router = useRouter();
  const {id} = router.query;
  const [tsp] = useAtom(PostDetailGetTspAtom);

  const {data, refetch} = trpc.post.findFirstForDetail.useQuery({id: Number(id)}, {enabled: !!id});

  useEffect(() => {
    if (router.isReady) refetch();
  }, [tsp]);

  return {data, refetch};
};
