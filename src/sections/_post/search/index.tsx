/* eslint-disable react/jsx-no-useless-fragment */
import {PrefectureSearchModal} from 'src/sections/_post/search/c/prefecture-search-modal';
import {VariousSearchModal} from 'src/sections/_post/search/c/various-search-modal';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import PostMediaList from './c/post-media-list';

import PostList from './c/post-list-and-order';
import StartPointSetModal from './c/start-point-set-modal';
import FilterAndTag from './c/filter-parts';

export const PostSearch = () => {
  const router = useRouter();
  const initTab = router.query.tab?.toString();

  // tabをメモ化
  const memoTab = useMemo(() => initTab, [initTab]);

  if (!router.isReady || !memoTab) return <></>;

  return (
    <>
      {memoTab === 'text' ? (
        /* 活動 */
        <>
          <StartPointSetModal />
          <PrefectureSearchModal />
          <VariousSearchModal />
          <FilterAndTag initialTab={memoTab} />
          <PostList />
        </>
      ) : (
        /* 画像・動画 */
        <>
          <StartPointSetModal />
          <PrefectureSearchModal />
          <VariousSearchModal />
          <FilterAndTag initialTab={memoTab} />
          <PostMediaList />
        </>
      )}
    </>
  );
};

// const OrderAtom = atomWithStorage<(typeof NMountainFindManySchema)['_type']['orderBy']>(
//   'src/sections/_mountain/search/c/mt-list/index.tsx',
//   'distanceAsc',
//   createJSONStorage(() => sessionStorage)
// );
