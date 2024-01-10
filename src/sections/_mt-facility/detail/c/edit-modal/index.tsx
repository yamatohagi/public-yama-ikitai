import {LoadingButton} from '@mui/lab';
import {DialogActions, Button} from '@mui/material';
import MtFacilityCreateEditForm from 'src/sections/_mt-facility/create/c/mt-facility-ce-form';
import useMtFacilityFormCreate from 'src/sections/_mt-facility/create/hooks/useMtFacilityForm';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useAtom} from 'jotai';
import {useImageUploadReplaceOne} from 'src/hooks/useImageUploadReplace';
import {MediaType} from '@prisma/client';
import {useEffect, useState} from 'react';
import {css} from 'styled-system/css';
import {UpdateFacilitySpecific} from './api';
import useMtFacilityForm, {MtFacilityInput} from './hooks';

export type FacilitySpecificEditModalProps = {
  mtFacilityId: number;
  refetch: VoidFunction;
  closeModal: VoidFunction;
};

function FacilitySpecificEditModalInner({refetch, mtFacilityId, closeModal}: FacilitySpecificEditModalProps) {
  const methods = useMtFacilityForm({mtFacilityId});
  const {
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const {update} = UpdateFacilitySpecific({refetch, closeModal});
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const {imageUpload} = useImageUploadReplaceOne();
  const [images] = useAtom(ImagesAndLabelAtom);
  const {data: session} = useSession();
  const router = useRouter();
  const user = session?.user;

  const onSubmit = async (formValue: MtFacilityInput) => {
    try {
      if (!user?.id) {
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
            width: image.width,
            height: image.height,
          }
      );

      await update.mutateAsync({
        id: Number(mtFacilityId),
        userId: user.id,
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
    <MtFacilityCreateEditForm
      handleReplySubmit={onSubmit}
      methods={methods as ReturnType<typeof useMtFacilityFormCreate>}
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

export default FacilitySpecificEditModalInner;
