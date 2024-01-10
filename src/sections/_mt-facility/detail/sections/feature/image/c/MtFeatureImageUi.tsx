import GalleryImages from 'src/components/ui/GalleryImages';
import PostCreateButton from 'src/components/post/post-create-button';
import {InfiniteScroll} from 'src/components/InfiniteScroll';
import Modal from 'src/components/Modal';
import {useModal} from 'src/hooks/useModal';
import type GetMtFacilityFeatureImage from '../api';
import PostCreateModalInner from '../../../../../../../components/mt-facility/specifics/post-create';

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
  const {openModal: postCreateOpenModal, isOpen: postCreateModalIsOpen, closeModal: postCreateCloseModal} = useModal({});
  return (
    <>
      {postCreateModalIsOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <PostCreateModalInner viewTitle={title} mtFacility={{id, hashtagName: title}} refresh={refetch} closeModal={postCreateCloseModal} />
        </Modal>
      )}
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage}>
        <GalleryImages photoItems={searchedPhotoItems} column={3} />
      </InfiniteScroll>
      <PostCreateButton
        onClick={() => {
          postCreateOpenModal({
            mtFacilityId: id,
            idName: title,
          });
        }}
      />
    </>
  );
};

export default MtFeatureImageUi;
