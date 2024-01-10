import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {paths} from 'src/routes/paths';
import type {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';

export const usePostMediaGet = (myPageUserId?: string) => {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 24; // 例: 一度に10件のデータを取得
  const router = useRouter();

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.post.findManyUserProfileMedia.useInfiniteQuery(
    {
      userId: myPageUserId || router.query.id?.toString() || '',
      limit,
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
      enabled: !!router.isReady,
    }
  );

  const photos = useMemo(() => rPostPages?.pages.flatMap((page) => ('photos' in page ? page.photos : page)), [rPostPages]);

  const searchedPhotoItems = photos?.map((photo) => ({
    id: photo.id,
    type: photo.type,
    original: photo.original,
    thumbnail: photo.thumbnail,
    width: photo.width,
    height: photo.height,
    title: photo.title,
    postId: photo.postId,
    uploadStatus: photo.uploadStatus as uploadStatusType,
    onClick: () => router.push(`${paths.post.index.path}/${photo.postId}`),
  }));

  return {searchedPhotoItems, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage};
};
