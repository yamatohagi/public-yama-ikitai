import {trpc} from 'src/utils/trpc';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useMemo} from 'react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {findManyMtFacilityPhotoSchema} from 'server/routers/photo/schemas/findManyMtFacilityPhotoSchema';
import {useMtFacilityPhotoFilterStore} from 'src/components/provider/mtFacilityPhotoFilterStore';
import {useAtom} from 'jotai';
import type {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';

const OrderAtom = atomWithStorage<(typeof findManyMtFacilityPhotoSchema)['_type']['orderBy']>(
  'src/sections/_mt-facility/detail/sections/photo/c/post-media/api.ts',
  'likeDesc',
  createJSONStorage(() => sessionStorage)
);

export default function GetMtFacilityPhotos() {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 9; // 例: 一度に10件のデータを取得
  const {filteredValues} = useMtFacilityPhotoFilterStore();

  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  const router = useRouter();
  const {id} = router.query;

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = trpc.photo.findManyMtFacilityPhoto.useInfiniteQuery(
    {
      searchFilter: filteredValues,
      orderBy,
      limit,
      mtFacilityId: Number(id),
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );

  const photos = useMemo(() => rPostPages?.pages.flatMap((page) => ('photos' in page ? page.photos : page)), [rPostPages]);
  const count = useMemo(() => rPostPages?.pages.flatMap((page) => ('count' in page ? page.count : page)), [rPostPages]);

  const searchedPhotoItems = photos?.map((photo) => ({
    ...photo,
    uploadStatus: photo.uploadStatus as uploadStatusType,
    onClick: () => router.push(`${paths.post.index.path}/${photo.postId}`),
  }));

  return {searchedPhotoItems, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, refetch};
}
