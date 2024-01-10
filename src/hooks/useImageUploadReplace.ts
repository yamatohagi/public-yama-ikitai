import {MediaType} from '@prisma/client';

import {getMediaSize} from 'src/components/ui/image-select/with-label';
import {uploadCompressedImage, uploadVideo} from 'src/utils/imageUploader';

// 複数の画像を処理するフック
export const useImageUploadReplace = () => {
  const imageUpload = async (images: Blob[], isIos: boolean) => {
    return Promise.all(images.map((image) => uploadImage(image, isIos)));
  };

  return {imageUpload};
};

// 単一の画像を処理するフック
export const useImageUploadReplaceOne = () => {
  const imageUpload = uploadImage;

  return {imageUpload};
};

// 共通の画像アップロードロジック
async function uploadImage(image: Blob, isIos: boolean) {
  const {width, height} = await getMediaSize(image);

  let imagePath: {thumbnail: string; original: string} | null = null;

  let type = null;

  if (image.type.includes('video')) {
    imagePath = await uploadVideo(image, isIos);
    type = MediaType.VIDEO;
  } else if (image.type.includes('image')) {
    imagePath = await uploadCompressedImage(image, 'lg');
    type = MediaType.PHOTO;
  }
  if (!imagePath) throw new Error('imagePathが未定義です');

  const {thumbnail, original} = imagePath;

  return {thumbnail, original, type: type || MediaType.PHOTO, width, height};
}
