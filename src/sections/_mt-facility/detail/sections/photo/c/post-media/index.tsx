import PostMedium from 'src/components/post/post-medium';
import ResultCount from 'src/components/post/post-result-count';
import Order from 'src/components/order-selectbox';
import Iconify from 'src/components/iconify';
import {CSSProperties} from 'react';
import {Fab} from '@mui/material';
import {useRouter} from 'next/router';
import {useModal} from 'src/hooks/useModal';
import Modal from 'src/components/Modal';
import {Provider} from 'jotai';
import GetMtFacilityPhotos from './api';
import PostCreateModalInner from './c/post-create';

export default function PostMediaList() {
  const {searchedPhotoItems, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, refetch} = GetMtFacilityPhotos();

  return (
    <>
      <ResultCount count={count?.[0] || 0} />
      <Order
        orderState={orderState}
        options={[
          {value: 'createdAtDesc', label: '新着順'},
          {value: 'likeDesc', label: '人気順'},
        ]}
      />
      <PostMedium
        searchedPhotoItems={searchedPhotoItems}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <Provider>
        <FloatingActionButton refetch={refetch} />
      </Provider>
    </>
  );
}

function FloatingActionButton({refetch}: {refetch: VoidFunction}) {
  const {openModal: postCreateOpenModal, isOpen: postCreateModalIsOpen, closeModal: postCreateCloseModal} = useModal({});
  const router = useRouter();
  const {id, name} = router.query;
  const fabStyle: CSSProperties = {
    position: 'fixed',
    bottom: '35px',
    right: '30px',
    zIndex: 1000,
  };

  return (
    <>
      {postCreateModalIsOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <PostCreateModalInner viewTitle={name?.toString()} mtFacility={{id: Number(id)}} refresh={refetch} closeModal={postCreateCloseModal} />
        </Modal>
      )}
      <Fab color="primary" aria-label="add" style={fabStyle} onClick={postCreateOpenModal}>
        <Iconify icon="tabler:pencil-plus" sx={{width: 40, height: 40, mr: 0.4, mb: 0.3}} />
      </Fab>
    </>
  );
}
