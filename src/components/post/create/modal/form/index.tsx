import {LoadingButton} from '@mui/lab';
import {DialogActions, Button, Grid, Typography, Skeleton} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import useResponsive from 'src/hooks/useResponsive';
import {RHFTextArea} from 'src/components/hook-form';
import {css} from 'styled-system/css';
import {MediaType} from '@prisma/client';
import {useImageUploadReplace} from 'src/hooks/useImageUploadReplace';
import {Provider, useAtom} from 'jotai';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import ImageSelectWithLabel from 'src/components/ui/image-select/with-label';
import {useEffect, useState} from 'react';
import usePostCreateForm, {PostInput} from './hooks';

export type MergedImages = {
  title: string;
  thumbnail: string;
  original: string;
  type: MediaType;
  width: number;
  height: number;
}[];

export function PostCreateModalForm({
  onSubmit: preSubmit,
  viewTitle,
  closeModal,
}: {
  onSubmit: ({formValue, mergedImages}: {formValue: PostInput; mergedImages: MergedImages}) => Promise<void>;
  viewTitle?: string;
  closeModal: VoidFunction;
}) {
  const {imageUpload} = useImageUploadReplace();
  const [images] = useAtom(ImagesAndLabelAtom);
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const methods = usePostCreateForm();
  const isMdUp = useResponsive('up', 'md');
  const {
    handleSubmit,
    formState: {isSubmitting, isLoading},
  } = methods;

  const onSubmit = async (formValue: PostInput) => {
    const uploadedImages = await imageUpload(
      images.map((image) => image.blobFile).filter((image): image is Blob => !!image),
      isIos
    );

    const mergedImages = uploadedImages.map((image, index) => image && {...image, title: ''});
    await preSubmit({formValue, mergedImages});
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className={css({pt: 7})}>
        <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
          <Typography variant={isMdUp ? 'subtitle1' : 'h5'} color="#323232" align="left" sx={{mb: 1}}>
            #「{viewTitle}」
          </Typography>
        </Grid>
        {/* 画像選択するやつ */}
        <ImageSelectWithLabel labelMode={false} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
              投稿内容
            </Typography>
            {isLoading ? <Skeleton variant="rounded" width="95%" height="10.5rem" /> : <RHFTextArea size="small" name="content" rows={3} />}
          </Grid>
        </Grid>
      </div>

      <DialogActions>
        <Button onClick={closeModal} color="secondary" sx={{flex: 10, fontSize: '0.7rem'}} size="large" variant="outlined">
          キャンセル
        </Button>

        <LoadingButton
          className={css({
            background: '#367B9D',
          })}
          loading={isSubmitting} // isLoadingまたはisSubmittingの場合、スピナーを表示
          type="submit"
          fullWidth
          color="secondary"
          sx={{flex: 10}}
          size="large"
          variant="contained"
        >
          投票
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
