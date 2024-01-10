import {LoadingButton} from '@mui/lab';
import {DialogActions, Button} from '@mui/material';
import MountainCreateEditForm from 'src/sections/_mountain/create/c/mountain-ce-form';
import {useAtom} from 'jotai';
import {useImageUploadReplaceOne} from 'src/hooks/useImageUploadReplace';
import {MediaType} from '@prisma/client';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {paths} from 'src/routes/paths';
import {useEffect, useState} from 'react';
import {css} from 'styled-system/css';
import useMountainForm, {MtInput} from './hooks';
import {UpdateMountain} from './api';

export type MountainEditModalProps = {
  mtId: number;
  closeModal: VoidFunction;
};

function MtEditModalInner({mtId, closeModal}: MountainEditModalProps) {
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const {methods} = useMountainForm({mtId});
  const {
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const [images] = useAtom(ImagesAndLabelAtom);
  const {imageUpload} = useImageUploadReplaceOne();
  const {update} = UpdateMountain({closeModal});
  const router = useRouter();
  const {data: session} = useSession();
  const userId = session?.user.id;

  const onSubmit = async (formValue: MtInput) => {
    try {
      if (!userId) {
        router.push(paths.login.path);
        return;
      }
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          if (image.dbPhotoId === null && image.blobFile !== null) return imageUpload(image.blobFile, isIos);
          return {
            // 既存の画像情報を返す
            thumbnail: image.previewUrl,
            original: image.previewUrl,
            type: image.type,
            width: image.width,
            height: image.height,
          };
        })
      );
      const mergedImages = uploadedImages.map(
        (image, index) =>
          image && {
            ...image,
            type: image.type === 'PHOTO' ? MediaType.PHOTO : MediaType.VIDEO,
            title: '',
            ...images.find((_, imageIdx) => imageIdx === index),
            labels: images[index].labels || [],
            width: image.width,
            height: image.height,
          }
      );

      await update.mutateAsync({
        originalId: Number(mtId),
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

  // 営業期間のところでエラーが出るので、
  return (
    <MountainCreateEditForm
      handleReplySubmit={onSubmit}
      methods={methods as ReturnType<typeof useMountainForm>['methods']}
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

export default MtEditModalInner;
