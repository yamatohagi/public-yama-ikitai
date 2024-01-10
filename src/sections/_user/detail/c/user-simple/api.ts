/* eslint-disable import/no-named-as-default */
import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';
import {Prisma} from '@prisma/client';
import {getQueryKey} from '@trpc/react-query';
import {useQueryClient} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import UserFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserFindFirstArgsSchema';
import {UserDetailGetTspAtom} from './state';

export const UserDetailGet = (myPageUserId?: string) => {
  const [tsp] = useAtom(UserDetailGetTspAtom);
  const router = useRouter();
  const userId = myPageUserId || router.query.id?.toString();

  const query: (typeof UserFindFirstArgsSchema)['_input'] = {
    where: {id: userId},
    include: {
      Post: true,
    },
  };

  const {data: mtFacility, refetch} = trpc.user.findFirst.useQuery<any, UserDetailGetGetResultType>(query, {
    enabled: !!userId,
  });

  useEffect(() => {
    if (router.isReady) refetch();
  }, [tsp]);

  return mtFacility;
};
export type UserDetailGetGetResultType = Prisma.UserGetPayload<{
  include: {
    Post: true;
  };
}>;

export const useFollowApiMutation = (followingId: string, followerId: string | null | undefined) => {
  const queryOptions = getFollowQueryOption(followingId, followerId || 'ログインしてないのでキャッシュもクソもない');

  const cacheKey = getQueryKey(trpc.userFollow.findFirst, queryOptions, 'query');

  const queryClient = useQueryClient();

  const createOne = trpc.userFollow.createOne.useMutation({
    onMutate: () => {
      queryClient.cancelQueries({queryKey: cacheKey});
      const previousData = queryClient.getQueryData(cacheKey);
      queryClient.setQueryData(cacheKey, {followerId});

      return {previousData};
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(cacheKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: cacheKey});
    },
  });

  const deleteOne = trpc.userFollow.deleteMany.useMutation({
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

export const useFollowApiQuery = (followingId: string | null | undefined, followerId: string | null | undefined) => {
  if (!followingId || !followerId) return {follow: null}; // ログインしていない場合はnullを返す

  const queryOptions = getFollowQueryOption(followingId, followerId);
  const {data: follow} = trpc.userFollow.findFirst.useQuery(queryOptions);
  return {
    follow,
  };
};

const getFollowQueryOption = (followingId: string, followerId: string) => ({
  select: {followerId: true},
  where: {followingId, followerId},
});
