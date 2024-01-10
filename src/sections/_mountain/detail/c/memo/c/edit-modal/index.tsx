import {LoadingButton} from '@mui/lab';
import {DialogActions, Button} from '@mui/material';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {paths} from 'src/routes/paths';
import {css} from 'styled-system/css';
import useMtMemoForm, {MtUrlMemoInput} from './hooks';
import {UpdateMountain} from './api';
import MtMemoForm from './c/form';

export type MountainEditModalProps = {
  mtId: number;
  closeModal: VoidFunction;
};

function MtMemoEditModalInner({mtId, closeModal}: MountainEditModalProps) {
  const methods = useMtMemoForm({mtId});
  const {
    formState: {isSubmitting, errors: formErrors},
  } = methods;

  const {update} = UpdateMountain({closeModal});
  const router = useRouter();
  const {data: session} = useSession();
  const userId = session?.user.id;

  const onSubmit = async (formValue: MtUrlMemoInput) => {
    try {
      if (!userId) {
        router.push(paths.login.path);
        return;
      }

      await update.mutateAsync({
        mtId: Number(mtId),
        userId,
        data: {
          ...formValue,
        },
      });
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };

  // 営業期間のところでエラーが出るので、
  return (
    <MtMemoForm
      handleReplySubmit={onSubmit}
      methods={methods}
      nextActionComponent={
        <DialogActions sx={{position: 'sticky', bottom: 0, pb: 2, pt: 1, bgcolor: 'background.paper'}}>
          <Button onClick={closeModal} color="secondary" sx={{flex: 1, fontSize: '0.7rem'}} size="large" variant="outlined">
            キャンセル
          </Button>

          <LoadingButton
            className={css({
              background: '#367B9D',
            })}
            loading={isSubmitting}
            type="submit"
            color="secondary"
            sx={{flex: 1}}
            size="large"
            variant="contained"
            disabled={Object.keys(formErrors).length > 0}
          >
            保存
          </LoadingButton>
        </DialogActions>
      }
    />
  );
}

export default MtMemoEditModalInner;
