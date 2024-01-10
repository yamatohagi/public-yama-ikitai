import Order from 'src/components/order-selectbox';
import ResultCount from 'src/components/post/post-result-count';
import PostMedium from 'src/components/post/post-medium';
import {useRouter} from 'next/router';
import {CSSProperties} from 'react';
import Modal from 'src/components/Modal';
import {Fab} from '@mui/material';
import Iconify from 'src/components/iconify';
import PostCreateModalInner from 'src/sections/_mountain/detail/c/mt-feature/c/post-create';
import {PostCreateModalState} from 'src/sections/_mountain/detail/c/mt-feature/c/post-create/state';
import {Provider} from 'jotai';
import GetMtPhotos from './api';

export default function PostMediaList() {
  const {searchedPhotoItems, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, refetch} = GetMtPhotos();

  return (
    <>
      <Provider>
        <FloatingActionButton refetch={refetch} />
      </Provider>

      {/* 検索結果の部分 */}
      <ResultCount count={count?.[0] || 0} />
      {/* 並び順の部分 */}
      <Order
        orderState={orderState}
        options={[
          {value: 'createdAtDesc', label: '新着順'},
          {value: 'likeDesc', label: '人気順'},
        ]}
      />
      {/* 写真の一覧 */}
      <PostMedium
        searchedPhotoItems={searchedPhotoItems}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}

function FloatingActionButton({refetch}: {refetch: VoidFunction}) {
  const modalState = PostCreateModalState();
  const {openModal: postCreateOpenModal, isOpen: postCreateModalIsOpen} = modalState;
  const router = useRouter();
  const {name} = router.query;
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
          <PostCreateModalInner modalState={modalState} />
        </Modal>
      )}
      <Fab
        color="primary"
        aria-label="add"
        style={fabStyle}
        onClick={() =>
          postCreateOpenModal({
            viewTitle: `${name}・新規投稿`,
            hashTag: null,
          })
        }
      >
        <Iconify icon="tabler:pencil-plus" sx={{width: 40, height: 40, mr: 0.4, mb: 0.3}} />
      </Fab>
    </>
  );
}
