// eslint-disable-next-line import/no-duplicates

import {trpc} from 'src/utils/trpc';
import {useQueryClient} from '@tanstack/react-query';
import {getQueryKey} from '@trpc/react-query';

export const useLikeApiMutation = (postId: number, userId?: string | null) => {
  const queryOptions = getLikeQueryOption(postId, userId || ''); // ログインしていない時はキャッシュもクソもない

  const cacheKey = getQueryKey(trpc.postLike.findFirst, queryOptions, 'query');

  const queryClient = useQueryClient();

  const createOne = trpc.postLike.createOne.useMutation({
    onMutate: () => {
      queryClient.cancelQueries({queryKey: cacheKey});
      const previousData = queryClient.getQueryData(cacheKey);
      queryClient.setQueryData(cacheKey, {userId});

      return {previousData};
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(cacheKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: cacheKey});
    },
  });

  const deleteOne = trpc.postLike.deleteMany.useMutation({
    onMutate: () => {
      queryClient.cancelQueries({queryKey: cacheKey});
      const previousData = queryClient.getQueryData(cacheKey);
      queryClient.setQueryData(cacheKey, null);
      return {previousData};
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(cacheKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: cacheKey});
    },
  });

  return {
    createOne,
    deleteOne,
  };
};

export const useLikeApiQuery = (postId: number, userId?: string | null) => {
  const queryOptions = getLikeQueryOption(postId, userId || ''); // ログインしていない時はキャッシュもクソもない

  const {data: postLikes} = trpc.postLike.findFirst.useQuery(queryOptions);
  return {
    postLikes,
  };
};

export const usePhotoApiQuery = (postId: number) => {
  // これ本当はまとめてpostと一緒に取得したいSQLがんばれ
  const {data: photos} = trpc.photo.findMany.useQuery({where: {postId}});

  return {
    photos,
  };
};

// getLikeQueryOption.ts
const getLikeQueryOption = (postId: number, userId: string) => ({
  select: {userId: true},
  where: {postId, userId},
});

export const useBookmarkApiMutation = (postId: number, userId?: string | null) => {
  const queryOptions = usePostBookmarkLikeQueryOptions(postId, userId || '');

  const cacheKey = getQueryKey(trpc.postBookmark.findFirst, queryOptions, 'query');

  const queryClient = useQueryClient();

  const createOne = trpc.postBookmark.createOne.useMutation({
    onMutate: () => {
      queryClient.cancelQueries({queryKey: cacheKey});
      const previousData = queryClient.getQueryData(cacheKey);
      queryClient.setQueryData(cacheKey, {userId});

      return {previousData};
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(cacheKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: cacheKey});
    },
  });

  const deleteOne = trpc.postBookmark.deleteMany.useMutation({
    onMutate: () => {
      queryClient.cancelQueries({queryKey: cacheKey});
      const previousData = queryClient.getQueryData(cacheKey);
      queryClient.setQueryData(cacheKey, null);
      return {previousData};
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(cacheKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: cacheKey});
    },
  });

  return {
    createOne,
    deleteOne,
  };
};

const usePostBookmarkLikeQueryOptions = (postId: number, userId: string) => ({
  select: {userId: true},
  where: {postId, userId},
});

export const usePostBookmarkApiQuery = (postId: number, userId?: null | string) => {
  const queryOptions = getLikeQueryOption(postId, userId || ''); // ログインしていない時はキャッシュもクソもない

  const {data: postBookmarks} = trpc.postBookmark.findFirst.useQuery(queryOptions);
  return {
    postBookmarks,
  };
};
