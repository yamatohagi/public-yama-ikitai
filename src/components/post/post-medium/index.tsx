import {InfiniteScroll} from 'src/components/InfiniteScroll';
import PostCreateButton from 'src/components/post/post-create-button';
import EmptyData from 'src/components/EmptyData';
import GalleryImages, {Image, ImageSkeleton} from './c/gallery-images';

type PostMediumProps = {
  searchedPhotoItems: Image[] | undefined;
  moreButtonPath?: string;
  fetchNextPage: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  creteOnClick?: () => void;
  iMode?: boolean;
};
const PostMedium = ({
  searchedPhotoItems,
  moreButtonPath,
  fetchNextPage,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  creteOnClick,
  iMode = false,
}: PostMediumProps) => {
  if (searchedPhotoItems === undefined && isLoading) return <ImageSkeleton />;

  if (searchedPhotoItems === undefined) return <EmptyData>{creteOnClick && <PostCreateButton onClick={creteOnClick} />}</EmptyData>;

  return (
    <>
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage}>
        <GalleryImages photoItems={searchedPhotoItems} column={3} iMode={iMode} />
      </InfiniteScroll>
      {creteOnClick && <PostCreateButton onClick={creteOnClick} />}
    </>
  );
};

export default PostMedium;
