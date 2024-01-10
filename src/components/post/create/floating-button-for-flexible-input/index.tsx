import Modal from 'src/components/Modal';
import {Fab} from '@mui/material';
import Iconify from 'src/components/iconify';
import {useModal} from 'src/hooks/useModal';
import {useRouter} from 'next/router';
import {CSSProperties, memo} from 'react';
import PostCreateModalInner from './modal-inner';

function Button({refetch}: {refetch: VoidFunction}) {
  const {openModal: postCreateOpenModal, isOpen: postCreateModalIsOpen, closeModal: postCreateCloseModal} = useModal({});
  const router = useRouter();
  const {name} = router.query;
  const fabStyle: CSSProperties = {
    position: 'fixed',
    bottom: '10%',
    right: '30px',
    zIndex: 1000,
    backgroundColor: '#FA541C',
  };

  return (
    <>
      {postCreateModalIsOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <PostCreateModalInner viewTitle={name?.toString()} refresh={refetch} closeModal={postCreateCloseModal} />
        </Modal>
      )}
      <Fab color="primary" aria-label="add" style={fabStyle} onClick={postCreateOpenModal}>
        <Iconify icon="tabler:pencil-plus" sx={{width: 40, height: 40, mr: 0.4, mb: 0.3}} />
      </Fab>
    </>
  );
}

// メモ
export const FloatingActionButton = memo(Button);
