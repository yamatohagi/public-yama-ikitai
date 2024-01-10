import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {paths} from 'src/routes/paths';
import {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';

export const usePostMediaGet = () => {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 24; // 例: 一度に10件のデータを取得

  const router = useRouter();

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.post.findManyWithPhoto.useInfiniteQuery(
    {
      photoExistsOnly: true,
      limit,
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );

  const photos = useMemo(() => rPostPages?.pages.flatMap((page) => ('photos' in page ? page.photos : page)), [rPostPages]);

  const searchedPhotoItems = photos?.map((photo) => ({
    id: photo.Photo_id,
    type: photo.Photo_type,
    original: photo.Photo_original,
    thumbnail: photo.Photo_thumbnail,
    width: photo.Photo_width,
    height: photo.Photo_height,
    title: photo.Photo_title,
    postId: photo.Photo_postId,
    uploadStatus: photo.Photo_uploadStatus as uploadStatusType,
    onClick: () => router.push(`${paths.post.index.path}/${photo.Photo_postId}`),
  }));

  return {searchedPhotoItems, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage};
};
