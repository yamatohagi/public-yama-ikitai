import MoreButton from 'src/components/ui/MoreButton';
import {paths} from 'src/routes/paths';
import PostMedium from 'src/components/post/post-medium';
import {usePostFilterStore} from 'src/components/provider/postFilterStore';
import {usePostMediaGet} from './api';

export default function PostMediaList() {
  const {searchedPhotoItems, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = usePostMediaGet();
  const {reset} = usePostFilterStore();
  return (
    <>
      <PostMedium
        searchedPhotoItems={searchedPhotoItems}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={false} // ここでfalseにすることで無限スクロールを無効化
        isFetchingNextPage={isFetchingNextPage}
      />
      <MoreButton onClick={reset} link={`${paths.post.index.path}?tab=media`} label="もっと見る" />
    </>
  );
}
