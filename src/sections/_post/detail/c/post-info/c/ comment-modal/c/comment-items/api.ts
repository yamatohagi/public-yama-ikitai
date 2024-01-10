import {useAtom} from 'jotai';
import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {GetGetReplyTspAtom} from './state';

export default function GetReply(postId: number) {
  const [refetchTimeStamp] = useAtom(GetGetReplyTspAtom);
  const router = useRouter();
  const {data, refetch} = trpc.post.findManyReplies.useQuery({postId: Number(postId)}, {enabled: !!postId});

  useEffect(() => {
    if (router.isReady) refetch();
  }, [refetchTimeStamp]);

  return {data};
}
