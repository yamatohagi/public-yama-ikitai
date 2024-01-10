import {useImageUploadReplaceOne} from 'src/hooks/useImageUploadReplace';
import {Provider, useAtom} from 'jotai';
import {MediaType} from '@prisma/client';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useEffect, useState} from 'react';
import {useCreateTrailheadMutation} from './api';
import TrailheadCreateEditForm from './c/trailhead-ce-form';
import useTrailheadForm, {TrailheadInput} from './hooks/useTrailheadForm';

export default function TrailheadCreate() {
  const methods = useTrailheadForm();
  const {create} = useCreateTrailheadMutation();
  const {imageUpload} = useImageUploadReplaceOne();
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const [images] = useAtom(ImagesAndLabelAtom);
  const {data: session} = useSession();
  const router = useRouter();

  const handleReplySubmit = async (params: TrailheadInput) => {
    const userId = session?.user?.id;
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

      const mergedImages = uploadedImages
        .map((image, index) => image && {...image, title: params.imageSelectTitle?.[index] || ''})
        .filter(
          (
            image
          ): image is {
            title: string;
            thumbnail: string;
            original: string;
            type: MediaType;
            width: number;
            height: number;
          } => !!image
        ); // タイトルとかをimageにマージ

      await create.mutateAsync({data: {...params, images: mergedImages}, userId}); // todo:userId変更して
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };

  return (
    <Provider>
      <TrailheadCreateEditForm handleReplySubmit={handleReplySubmit} methods={methods} />
    </Provider>
  );
}
