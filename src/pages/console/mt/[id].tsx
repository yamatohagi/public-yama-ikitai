import {Provider, useAtom} from 'jotai';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useImageUploadReplaceOne} from 'src/hooks/useImageUploadReplace';
import MainLayout from 'src/layouts/main';
import useMountainForm, {MtInput} from 'src/sections/_mountain/detail/c/edit-modal/hooks';

import {trpc} from 'src/utils/trpc';
import {useSession} from 'next-auth/react';
import {paths} from 'src/routes/paths';
import {MediaType} from '@prisma/client';
import MountainCreateEditForm from 'src/sections/_mountain/create/c/mountain-ce-form';
import {DialogActions} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {css} from 'styled-system/css';
// sections

MountainDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

function MtApprovalEdit() {
  const router = useRouter();
  const {id, originId} = router.query;

  const mtId = Number(id) || 0;

  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const {methods, diff, reDiff} = useMountainForm({
    mtId: mtId || Number(originId),
    originId: Number(originId),
  });
  const {
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const [images] = useAtom(ImagesAndLabelAtom);
  const {imageUpload} = useImageUploadReplaceOne();
  const update = trpc.mountains.upsertApproval.useMutation({
    onSuccess: (data) => {
      router.push(paths.console.index.path);
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

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
        id: originId ? mtId : undefined, // originIdがない時は新規作成
        originId: originId ? Number(originId) : mtId,
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

  console.log('formErrors', formErrors);

  return (
    <>
      {Object.keys(diff).length > 0 && (
        <div style={{color: 'red'}}>
          <pre>{JSON.stringify(diff, null, 2)}</pre>
        </div>
      )}
      {Object.keys(reDiff).length > 0 && (
        <div style={{color: 'green'}}>
          <pre>{JSON.stringify(reDiff, null, 2)}</pre>
        </div>
      )}

      <MountainCreateEditForm
        handleReplySubmit={onSubmit}
        methods={methods as ReturnType<typeof useMountainForm>['methods']}
        nextActionComponent={
          <DialogActions sx={{position: 'sticky', bottom: 0, pb: 2, pt: 1, bgcolor: 'background.paper'}}>
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
    </>
  );
}

export default function MountainDetailPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>山の編集 - ヤマイキタイ</title>
      </Head>
      <Provider>{router.isReady && <MtApprovalEdit />}</Provider>
    </>
  );
}
