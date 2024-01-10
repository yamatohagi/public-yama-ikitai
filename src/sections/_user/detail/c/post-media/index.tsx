import PostMedium from 'src/components/post/post-medium';
import {usePostMediaGet} from './api';

type Props = {
  myPageUserId?: string;
};

const PostList = ({myPageUserId}: Props) => {
  const {searchedPhotoItems, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = usePostMediaGet(myPageUserId);

  return (
    <PostMedium
      searchedPhotoItems={searchedPhotoItems}
      fetchNextPage={fetchNextPage}
      isLoading={isLoading}
      hasNextPage={!!hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default PostList;
