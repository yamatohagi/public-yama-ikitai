import PostListC from 'src/components/post/post-list';
import {usePostListGet} from './api';

type PostListProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  likeOnly?: boolean;
  replyOnly?: boolean;
  myPageUserId?: string;
};
const PostList = ({likeOnly, myPageUserId, replyOnly}: PostListProps) => {
  const {posts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = usePostListGet(likeOnly, myPageUserId, replyOnly);

  return (
    <PostListC
      posts={posts}
      fetchNextPage={fetchNextPage}
      isLoading={isLoading}
      hasNextPage={!!hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default PostList;
