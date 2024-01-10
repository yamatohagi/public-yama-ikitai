import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import AuxiliaryButton from 'src/components/ui/PointButton';
import Iconify from 'src/components/iconify';
import {useAuth} from 'src/hooks/use-auth';
import {useModal} from 'src/hooks/useModal';
import {alertThenExecute} from 'server/functions/etc';
import {useRouter} from 'next/router';
import Modal from 'src/components/Modal';
import MtMemoList from './c/list';
import MtMemoEditModalInner from './c/edit-modal';

export default function Memo() {
  const {loginCheck} = useAuth();
  const router = useRouter();
  const mtId = Number(router.query.id);
  const {openModal: editOpenModal, isOpen: editModalIsOpen, closeModal} = useModal({});
  return (
    <>
      {/* 編集Modal */}
      {editModalIsOpen && (
        <Modal open onClose={() => alertThenExecute(closeModal)} dialogProps={{fullWidth: true}} width="95%">
          <MtMemoEditModalInner mtId={mtId} closeModal={closeModal} />
        </Modal>
      )}

      {/* 項目 */}
      <Grid item xs={12} sm={12} sx={{mt: 7}}>
        <div style={{marginLeft: '0.2rem'}}>
          <TitleStartIcon sx={{ml: 0.2}} />
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginLeft: '0.5rem',
            }}
          >
            メモ
          </span>
        </div>
        <AuxiliaryButton
          style={{marginRight: '0.9rem'}}
          border={false}
          title={
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Iconify icon="mi:edit" sx={{width: 20, height: 20, ml: 0.9}} />
              編集
            </div>
          }
          onClick={(v) => loginCheck() && editOpenModal(v)}
        />
      </Grid>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '2.4rem'}}>
        <div
          style={{
            width: '97%',
            height: '0.08rem',
            background: '#EDEDED',
          }}
        />
      </div>
      {/* メモの部品 */}
      <Grid item xs={12} sm={12}>
        <MtMemoList style={{marginTop: '2.2rem'}} />
      </Grid>
    </>
  );
}
