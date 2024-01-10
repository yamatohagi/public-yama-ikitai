import {trpc} from 'src/utils/trpc';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useMemo} from 'react';
import {usePostFilterStore} from 'src/components/provider/postFilterStore';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {findManyWithPhotoSchema} from 'server/routers/post/schemas/findManyWithPhotoSchema';
import {useAtom} from 'jotai';
import type {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';

const OrderAtom = atomWithStorage<(typeof findManyWithPhotoSchema)['_type']['orderBy']>(
  'src/sections/_post/search/c/post-media-list/api.ts',
  'likeDesc',
  createJSONStorage(() => sessionStorage)
);

export default function GetPostPhotos() {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 9; // 例: 一度に10件のデータを取得
  const {filteredValues} = usePostFilterStore();
  const router = useRouter();
  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = trpc.post.findManyWithPhoto.useInfiniteQuery(
    {
      photoExistsOnly: true,
      orderBy,
      searchFilter: filteredValues,
      limit,
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );

  const photos = useMemo(() => rPostPages?.pages.flatMap((page) => ('photos' in page ? page.photos : page)), [rPostPages]);
  const count = useMemo(() => rPostPages?.pages.flatMap((page) => ('count' in page ? page.count : page)), [rPostPages]);

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

  return {searchedPhotoItems, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, refetch};
}
