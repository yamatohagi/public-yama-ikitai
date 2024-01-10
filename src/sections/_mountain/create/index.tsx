import {useImageUploadReplace} from 'src/hooks/useImageUploadReplace';
import {Provider, useAtom} from 'jotai';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {useEffect, useState} from 'react';
import {useCreateMtMutation} from './api';
import MountainCreateEditForm from './c/mountain-ce-form';
import useMountainForm, {MountainInput} from './hooks/useMountainForm';

export default function MtCreate() {
  return (
    <Provider>
      <MountainCreate />
    </Provider>
  );
}

function MountainCreate() {
  const methods = useMountainForm();
  const {createOne} = useCreateMtMutation();
  const {imageUpload} = useImageUploadReplace();
  const [images] = useAtom(ImagesAndLabelAtom);
  const {data: session} = useSession();
  const router = useRouter();
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  const handleReplySubmit = async (params: MountainInput) => {
    try {
      if (!session?.user?.id) {
        router.push(paths.login.path);
        return;
      }
      const uploadedImages = await imageUpload(
        images.map((image) => image.blobFile).filter((image): image is Blob => !!image),
        isIos
      );

      const mergedImages = uploadedImages.map(
        (image, index) =>
          image && {
            ...image,
            title: params.imageSelectTitle?.[index] || '',
            labels: images[index].labels || [],
          }
      );

      await createOne.mutateAsync({data: {...params, images: mergedImages}, userId: session.user.id}); // todo:userId変更して
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };

  return <MountainCreateEditForm handleReplySubmit={handleReplySubmit} methods={methods} />;
}
