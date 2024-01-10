import {trpc} from 'src/utils/trpc';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useMemo} from 'react';
import {usePostFilterStore} from 'src/components/provider/postFilterStore';
import {findManyWithPhotoSchema} from 'server/routers/post/schemas/findManyWithPhotoSchema';
import {useAtom} from 'jotai';

const OrderAtom = atomWithStorage<(typeof findManyWithPhotoSchema)['_type']['orderBy']>(
  'src/sections/_post/search/c/post-list-and-order/api.ts',
  'distanceAsc',
  createJSONStorage(() => sessionStorage)
);

export default function GetPostList() {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 3; // 例: 一度に10件のデータを取得
  const {filteredValues} = usePostFilterStore();
  // 並び順

  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  // todo:そもそも並び替え変更時にapiいかない、apiも対応してないからお願い

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = trpc.post.findManyWithPhotos.useInfiniteQuery(
    {
      searchFilter: filteredValues,
      limit,
      orderBy,
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );
  // コレを投稿に変えて末端に渡してpostのエラーを直す
  const posts = useMemo(() => rPostPages?.pages.flatMap((page) => ('posts' in page ? page.posts : page)), [rPostPages]);
  const count = useMemo(() => rPostPages?.pages.flatMap((page) => ('count' in page ? page.count : page)), [rPostPages]);

  return {
    posts,
    count,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    orderState,
    refetch,
  };
}
