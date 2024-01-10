import {useRef} from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {trpc} from 'src/utils/trpc';
import {useQueryClient} from '@tanstack/react-query';
import {getQueryKey} from '@trpc/react-query';
import {findManyRepliesSchema} from 'server/routers/post/schemas/findManyRepliesSchema';
import {FindManyRepliesType} from 'server/routers/post/type';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';

export const usePostCreateOneM = (parentId: number, resetFocus?: () => void) => {
  const {data: session} = useSession();
  const router = useRouter();
  const user = session?.user;

  const postId = useRouter().query.id?.toString() || '';

  const tempIdRef = useRef<number | null>(null);
  const queryClient = useQueryClient();
  const queryOptions: (typeof findManyRepliesSchema)['_type'] = {postId: Number(postId)};
  const cacheKey = getQueryKey(trpc.post.findManyReplies, queryOptions, 'query');

  const postCreate = trpc.post.createOne.useMutation({
    onMutate: (newComment) => {
      if (resetFocus) resetFocus();
      let tempId: number | null = null;
      const previousData: FindManyRepliesType | null = queryClient.getQueryData(cacheKey) as FindManyRepliesType;

      if (!previousData) return {previousData: null, tempId};

      // tempIdRefがキャッシュに存在する場合はそのstatusのみを変更
      if (tempIdRef.current) {
        const isMainReply = Number(newComment.data.parentId) === Number(postId);

        if (isMainReply) {
          const index = previousData.Replies.findIndex((reply) => reply.id === tempIdRef.current);
          if (index !== -1) {
            queryClient.setQueryData(cacheKey, (oldData: FindManyRepliesType | undefined) => {
              const newReplies = [...oldData!.Replies];
              newReplies[index] = {...newReplies[index], status: 'posting'};

              return {...oldData, Replies: newReplies};
            });
            return {previousData, tempId: tempIdRef.current};
          }
        } else {
          const index = previousData.Replies.findIndex((reply) => reply.Replies.some((reply) => reply.id === tempIdRef.current));
          if (index !== -1) {
            queryClient.setQueryData(cacheKey, (oldData: FindManyRepliesType | undefined) => {
              const newReplies = [...oldData!.Replies];
              const newRepliesReplies = [...newReplies[index].Replies];
              const replyIndex = newRepliesReplies.findIndex((reply) => reply.id === tempIdRef.current);
              newRepliesReplies[replyIndex] = {...newRepliesReplies[replyIndex], status: 'posting'};
              newReplies[index] = {...newReplies[index], Replies: newRepliesReplies};

              return {...oldData, Replies: newReplies};
            });
            return {previousData, tempId: tempIdRef.current};
          }
        }
      }

      tempId = Date.now();
      queryClient.cancelQueries({queryKey: cacheKey});

      // 新しいコメントをキャッシュに追加

      const isMainReply = Number(newComment.data.parentId) === Number(postId);

      if (isMainReply) {
        queryClient.setQueryData(cacheKey, {
          ...previousData,
          Replies: [...previousData.Replies, {...newComment.data, status: 'posting', id: tempId}],
        });
      } else {
        console.log('こっちは行った時の挙動が謎'); // todo: いつかヒモとく
        const index = previousData.Replies.findIndex((reply) => reply.id === newComment.data.parentId);
        if (index === -1) return {previousData: null, tempId};
        const newReplies = [...previousData.Replies];
        newReplies[index] = {
          ...newReplies[index],
          Replies: [...newReplies[index].Replies, {...newComment.data, status: 'posting', id: tempId} as any], // todo:any外して
        };
        queryClient.setQueryData(cacheKey, {...previousData, Replies: newReplies});
      }

      return {previousData: previousData || null, tempId};
    },
    onSuccess: (returnedData, _, context) => {
      const isMainReply = Number(returnedData.parentId) === Number(postId);

      if (isMainReply) {
        queryClient.setQueryData(cacheKey, (oldData: FindManyRepliesType | undefined) => {
          const index = oldData!.Replies.findIndex((reply) => reply.id === context?.tempId);
          if (index === -1) return oldData;

          const newReplies = [...oldData!.Replies];
          newReplies[index] = {...returnedData, status: 'success', Replies: []};

          return {...oldData, Replies: newReplies};
        });
      } else {
        queryClient.setQueryData(cacheKey, (oldData: FindManyRepliesType | undefined) => {
          const mainReplyIdx = oldData!.Replies.findIndex((reply) => reply.Replies.some((reply) => reply.id === context?.tempId));
          if (mainReplyIdx === -1) return oldData;

          const newReplies = [...oldData!.Replies];
          const newRepliesReplies = [...newReplies[mainReplyIdx].Replies];
          const replyIndex = newRepliesReplies.findIndex((reply) => reply.id === context?.tempId);
          newRepliesReplies[replyIndex] = {...returnedData, status: 'success'};
          newReplies[mainReplyIdx] = {...newReplies[mainReplyIdx], Replies: newRepliesReplies};

          return {...oldData, Replies: newReplies};
        });
      }
    },
    onError: (error, newComment, context) => {
      const isMainReply = Number(newComment.data.parentId) === Number(postId);

      if (isMainReply) {
        queryClient.setQueryData(cacheKey, (oldData: FindManyRepliesType | undefined) => {
          const index = oldData!.Replies.findIndex((reply) => reply.id === context?.tempId);
          if (index === -1) return oldData;

          const newReplies = [...oldData!.Replies];
          newReplies[index] = {...newReplies[index], status: 'error'};

          return {...oldData, Replies: newReplies};
        });
      } else {
        queryClient.setQueryData(cacheKey, (oldData: FindManyRepliesType | undefined) => {
          const mainReplyIdx = oldData!.Replies.findIndex((reply) => reply.Replies.some((reply) => reply.id === context?.tempId));
          if (mainReplyIdx === -1) return oldData;

          const newReplies = [...oldData!.Replies];
          const newRepliesReplies = [...newReplies[mainReplyIdx].Replies];
          const replyIndex = newRepliesReplies.findIndex((reply) => reply.id === context?.tempId);
          newRepliesReplies[replyIndex] = {...newRepliesReplies[replyIndex], status: 'error'};
          newReplies[mainReplyIdx] = {...newReplies[mainReplyIdx], Replies: newRepliesReplies};

          return {...oldData, Replies: newReplies};
        });
      }
    },
  });

  // tempIdからキャッシュを検索し値を返す
  function getCacheData(tempId: number) {
    const previousData: FindManyRepliesType = queryClient.getQueryData(cacheKey) as FindManyRepliesType;
    if (!previousData) return null;
    const targetObj =
      previousData.Replies.find((reply) => reply.id === tempId) ||
      previousData.Replies.find((reply) => reply.Replies.some((reply) => reply.id === tempId))?.Replies.find((reply) => reply.id === tempId);

    return targetObj;
  }

  const handlePost = async ({value, setValue, tempId}: {value?: string; setValue?: (input: string) => void; tempId?: number}) => {
    tempIdRef.current = tempId || null;
    try {
      if (!user) {
        router.push(paths.login.path); // わからんとりあえず飛ばす
        return;
      }

      if (tempId) {
        const data = getCacheData(tempId);

        if (!data) return;
        await postCreate.mutateAsync({
          data: {
            content: data.content,
            userId: user.id,
            parentId: Number(data.parentId),
            activityDate: data.activityDate,
          },
        });
      } else {
        if (setValue) setValue('');
        await postCreate.mutateAsync({
          data: {
            content: value || '',
            userId: user.id,
            parentId: Number(parentId),
            activityDate: new Date(),
          },
        });
      }
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };

  return {postCreate, getCacheData, tempIdRef, handlePost};
};
