import {useCallback, useState} from 'react';
import {Dialog, Stack} from '@mui/material';
import {Area} from 'react-easy-crop';
import {CropModal} from 'src/components/crop-modal';
import {ImageDisplay} from 'src/components/image-display';
import {ImageInput} from 'src/components/image-input';
import {getCroppedImg} from 'src/utils/cropImage';
import {ImagesAndLabelAtom} from 'src/components/ui/image-select/with-label/state';
import {useAtom} from 'jotai';
import Compressor from 'compressorjs';

// todo:これ一枚しか対応してないのでどうにかして
export const ImageHandle = () => {
  const [openCrop, setOpenCrop] = useState<boolean>(false);

  const [cropPreviewUrl, setCropPreviewUrl] = useState<string | null>(null);
  const [images, setImages] = useAtom(ImagesAndLabelAtom);

  const closeCrop = () => {
    setOpenCrop(false);
  };

  const handleImageSave = async (croppedAreaPixels: Area, rotation: number) => {
    const blob = await getCroppedImg(cropPreviewUrl || '', croppedAreaPixels, rotation, 'test');
    const url = URL.createObjectURL(blob);

    setImages((prev) => {
      const newImages = [...prev];
      newImages[0].blobFile = blob;
      newImages[0].previewUrl = url;
      return newImages;
    });
    closeCrop();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOpenCrop(true);
      const file: File = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setCropPreviewUrl(imageDataUrl as string);
    }
  };

  const readFile = useCallback((file: Blob) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        getNormalizedFile(file)
          .then((normalizedFile) => reader.readAsDataURL(normalizedFile as Blob))
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  return (
    <>
      {images[0]?.previewUrl ? (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5}>
          <ImageDisplay
            orderNumber={0}
            width={200}
            height={200}
            photoImageId={images[0].previewUrl}
            photoURL={images[0].previewUrl}
            handleChange={handleChange}
          />
        </Stack>
      ) : (
        <ImageInput orderNumber={0} width={200} height={200} handleChange={handleChange} />
      )}
      <Dialog maxWidth="sm" open={openCrop}>
        {cropPreviewUrl && (
          <CropModal width={300} height={300} photoURL={cropPreviewUrl} disabled={false} closeCrop={closeCrop} saveImage={handleImageSave} />
        )}
      </Dialog>
    </>
  );
};

export const getNormalizedFile = (file: Blob) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      maxWidth: 1000,
      maxHeight: 1000,
      success(normalizedFile) {
        resolve(normalizedFile);
      },
      error(error) {
        reject(error);
      },
    });
  });
};
