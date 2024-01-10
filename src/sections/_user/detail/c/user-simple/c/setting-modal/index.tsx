import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {paths} from 'src/routes/paths';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';
import {css} from 'styled-system/css';
import useUserInfoForm, {Input} from './hooks';
import {UpdateMountain} from './api';
import UserInfoEditForm from './c/form';

export type MountainSettingModalProps = {
  closeModal: VoidFunction;
};

function UserSettingModalInner({closeModal}: MountainSettingModalProps) {
  const methods = useUserInfoForm();
  const [, setMtSearchSetting] = useMtSearchSetting();
  const {
    formState: {isSubmitting, errors: formErrors},
  } = methods;

  const {update} = UpdateMountain({closeModal});
  const router = useRouter();
  const {data: session} = useSession();
  const userId = session?.user.id;

  const onSubmit = async (formValue: Input) => {
    try {
      if (!userId) {
        router.push(paths.login.path);
        return;
      }
      setMtSearchSetting((prev) => ({
        ...prev,
        from: {
          label: formValue.startPointLabel ? formValue.startPointLabel : prev.from.label,
          lat: formValue.startPointLat ? parseFloat(formValue.startPointLat) : prev.from.lat,
          lng: formValue.startPointLng ? parseFloat(formValue.startPointLng) : prev.from.lng,
        },
      }));
      await update.mutateAsync({
        userId,
        data: {
          ...formValue,
        },
      });
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };

  return (
    <UserInfoEditForm
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

export default UserSettingModalInner;
