import {trpc} from 'src/utils/trpc';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useMemo} from 'react';
import {useRouter} from 'next/router';
import {useMtDetailPhotoFilterStore} from 'src/components/provider/mtDetailPhotoFilterStore';
import {findManyMtDetailPhotoSchema} from 'server/routers/post/schemas/findManyMtDetailPhotoSchema';
import {useAtom} from 'jotai';

const OrderAtom = atomWithStorage<(typeof findManyMtDetailPhotoSchema)['_type']['orderBy']>(
  'src/sections/_mountain/detail/sections/photo/c/post-media/api.ts',
  'createdAtDesc',
  createJSONStorage(() => sessionStorage)
);

export default function GetMtPhotos() {
  const {filteredValues} = useMtDetailPhotoFilterStore();
  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;
  const router = useRouter();
  const {id, tab} = router.query;

  const {data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, refetch} = trpc.post.findManyMtDetailPhoto.useInfiniteQuery(
    {
      mtId: Number(id),
      viewTo: tab === 'この山が見える',
      orderBy,
      searchFilter: filteredValues,
      limit: 9, // 例: 一度に10件のデータを取得
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );

  const photos = useMemo(() => data?.pages.flatMap((page) => ('photos' in page ? page.photos : page)), [data]);
  const count = useMemo(() => data?.pages.flatMap((page) => ('count' in page ? page.count : page)), [data]);

  return {searchedPhotoItems: photos, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, refetch};
}
