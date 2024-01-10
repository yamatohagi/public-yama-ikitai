import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {paths} from 'src/routes/paths';
import {useImageUploadReplace} from 'src/hooks/useImageUploadReplace';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {css} from 'styled-system/css';
import useUserForm, {Input} from './hooks';
import {UpdateMountain} from './api';
import UserEditForm from './c/form';

export type MountainEditModalProps = {
  closeModal: VoidFunction;
};

function UserEditModalInner({closeModal}: MountainEditModalProps) {
  const methods = useUserForm();
  const {
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const {imageUpload} = useImageUploadReplace();
  const [images] = useAtom(ImagesAndLabelAtom);
  const {update} = UpdateMountain({closeModal});
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const router = useRouter();
  const {data: session} = useSession();
  const userId = session?.user.id;

  const onSubmit = async (formValue: Input) => {
    try {
      if (!userId) {
        router.push(paths.login.path);
        return;
      }

      const uploadedImages = await imageUpload(
        images.map((image) => image.blobFile).filter((image): image is Blob => !!image),
        isIos
      );

      const mergedImages = uploadedImages.map((image, index) => image && {...image, title: ''});

      await update.mutateAsync({
        userId,
        data: {
          ...formValue,
          images: mergedImages,
        },
      });
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };

  return (
    <UserEditForm
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

export default UserEditModalInner;
