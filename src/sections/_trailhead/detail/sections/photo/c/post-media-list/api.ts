import {trpc} from 'src/utils/trpc';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useMemo} from 'react';
import {useRouter} from 'next/router';
import {findManyMtFacilityPhotoSchema} from 'server/routers/photo/schemas/findManyMtFacilityPhotoSchema';
import {useMtFacilityPhotoFilterStore} from 'src/components/provider/mtFacilityPhotoFilterStore';
import {useAtom} from 'jotai';

const OrderAtom = atomWithStorage<(typeof findManyMtFacilityPhotoSchema)['_type']['orderBy']>(
  'src/sections/_trailhead/detail/sections/photo/c/post-media-list/api.ts',
  'createdAtDesc',
  createJSONStorage(() => sessionStorage)
);

export default function GetMtFacilityPhotos() {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 9; // 例: 一度に10件のデータを取得
  const {filteredValues} = useMtFacilityPhotoFilterStore(); // これ関連も消して
  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  const router = useRouter();
  const {id} = router.query;
  const {tab} = router.query;

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.photo.findManyTrailheadPhoto.useInfiniteQuery(
    {
      orderBy,
      limit,
      trailheadId: Number(id),
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );

  const photos = useMemo(() => rPostPages?.pages.flatMap((page) => ('photos' in page ? page.photos : page)), [rPostPages]);
  const count = useMemo(() => rPostPages?.pages.flatMap((page) => ('count' in page ? page.count : page)), [rPostPages]);

  return {searchedPhotoItems: photos, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState};
}
