import {LoadingButton} from '@mui/lab';
import {DialogActions, Button, Grid, Typography, Skeleton} from '@mui/material';
import FormProvider from 'src/components/hook-form/FormProvider';
import useResponsive from 'src/hooks/useResponsive';
import {RHFTextArea} from 'src/components/hook-form';
import {css} from 'styled-system/css';
import {MediaType} from '@prisma/client';
import {useImageUploadReplaceOne} from 'src/hooks/useImageUploadReplace';
import {useAtom} from 'jotai';
import ImageSelectWithLabel from 'src/components/ui/image-select/with-label';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useEffect, useState} from 'react';
import usePostCreateForm, {PostInput} from '../../hooks';
import MtInput from './c/mt-input';
import MtFacilityInput from './c/mt-facility-input';
import TrailheadInput from './c/trailhead-input';
import HashtagInput from './c/hashtag-input';

export type MergedImages = {
  title: string;
  thumbnail: string;
  original: string;
  type: MediaType;
  width: number;
  height: number;
}[];

type PostCreateModalFlexibleFormProps = {
  onSubmit: ({formValue, mergedImages}: {formValue: PostInput; mergedImages: MergedImages}) => Promise<void>;
  viewTitle?: string;
  closeModal: VoidFunction;
  methods: ReturnType<typeof usePostCreateForm>;
};

export function PostCreateModalFlexibleForm({onSubmit: preSubmit, viewTitle, closeModal, methods}: PostCreateModalFlexibleFormProps) {
  const {imageUpload} = useImageUploadReplaceOne();

  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const [images] = useAtom(ImagesAndLabelAtom);

  const isMdUp = useResponsive('up', 'md');
  const {
    handleSubmit,
    formState: {isSubmitting, isLoading},
  } = methods;

  const onSubmit = async (formValue: PostInput) => {
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
          labels: image.labels,
          dbPhotoId: image.dbPhotoId,
        };
      })
    );

    const mergedImages = uploadedImages.map(
      (image, index) =>
        image && {
          ...image,
          title: '',
          labels: images[index].labels,
        }
    );

    await preSubmit({formValue, mergedImages});
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className={css({pt: 7})}>
        <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
          <Typography variant={isMdUp ? 'subtitle1' : 'h5'} color="#212121" align="left" sx={{mb: 1}}>
            つぶやく
          </Typography>
        </Grid>

        {/* 山選択 */}
        <MtInput />

        {/* 登山口選択 */}
        <TrailheadInput />

        {/* 山小屋選択 */}
        <MtFacilityInput />

        {/* シーン */}
        <HashtagInput />

        {/* 画像選択するやつ */}
        <ImageSelectWithLabel labelMode />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
            <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
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
          投稿
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
