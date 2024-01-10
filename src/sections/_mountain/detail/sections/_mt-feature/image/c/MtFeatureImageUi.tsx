import GalleryImages from 'src/components/ui/GalleryImages';
import PostCreateButton from 'src/components/post/post-create-button';
import GetMtFacilityFeatureImage from 'src/sections/_mt-facility/detail/sections/feature/image/api';
import {InfiniteScroll} from 'src/components/InfiniteScroll';
import Modal from 'src/components/Modal';
import {PostCreateModalState} from 'src/sections/_mountain/detail/c/mt-feature/c/post-create/state';
import PostCreateModalInner from 'src/sections/_mountain/detail/c/mt-feature/c/post-create';

type MtFeatureImageUiProps = {
  searchedPhotoItems?: NonNullable<ReturnType<typeof GetMtFacilityFeatureImage>['photos']>;
  id: number;
  title: string;
  refetch: VoidFunction;
  fetchNextPage: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
const MtFeatureImageUi = ({
  searchedPhotoItems,
  id,
  title,
  refetch,
  fetchNextPage,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
}: MtFeatureImageUiProps) => {
  const postCreateModalState = PostCreateModalState();

  return (
    <>
      {/* 投稿モーダル */}
      {postCreateModalState.isOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <PostCreateModalInner refetch={refetch} modalState={postCreateModalState} />
        </Modal>
      )}

      {/* 3列の画像ビュー */}
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage}>
        <GalleryImages photoItems={searchedPhotoItems} column={3} />
      </InfiniteScroll>

      {/* 投稿ボタン */}
      <PostCreateButton
        onClick={() => {
          postCreateModalState.openModal({
            viewTitle: title,
            hashTag: title,
          });
        }}
      />
    </>
  );
};

export default MtFeatureImageUi;
