import {useImageUploadReplaceOne} from 'src/hooks/useImageUploadReplace';
import {Provider, useAtom} from 'jotai';
import {MediaType} from '@prisma/client';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useEffect, useState} from 'react';
import {useCreateMtMutation} from './api';
import MtFacilityCreateEditForm from './c/mt-facility-ce-form';
import useMtFacilityForm, {MtFacilityInput} from './hooks/useMtFacilityForm';

export default function MtFacilityCreate() {
  const methods = useMtFacilityForm();
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const {createOne} = useCreateMtMutation();
  const {imageUpload} = useImageUploadReplaceOne();
  const [images] = useAtom(ImagesAndLabelAtom);
  const {data: session} = useSession();
  const router = useRouter();

  const handleReplySubmit = async (params: MtFacilityInput) => {
    try {
      if (!session?.user?.id) {
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

      await createOne.mutateAsync({data: {...params, images: mergedImages}, userId: session.user.id});
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };

  return (
    <Provider>
      <MtFacilityCreateEditForm handleReplySubmit={handleReplySubmit} methods={methods} />
    </Provider>
  );
}
