import {useSnackbarStore} from 'src/components/provider/snackbarStore';
import Compressor from 'compressorjs';
import cuid from 'cuid';
import {PutObjectCommand, PutObjectCommandInput, S3Client} from '@aws-sdk/client-s3';

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.NEXT_PUBLIC_CLOUDFLARE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY as string,
  },
});

const s3Client = new S3Client({
  region: 'ap-northeast-1',
  // endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
  },
});

// 画像アップロード機能
export const uploadImage = async (imageBlob: Blob) => {
  try {
    const filePath = `topImages/${cuid()}.jpg`; // 拡張子を追加
    await putImage(imageBlob, filePath);
    return filePath;
  } catch (error) {
    useSnackbarStore.getState().handleOpen({
      message: '画像のアップロードに失敗しました',
      color: 'error',
    });
    throw error;
  }
};

export const uploadCompressedImage = async (imageBlob: Blob, level: 'sm' | 'lg' = 'sm') => {
  const config = {
    sm: {
      quality: 1,
      maxWidth: 2000,
      maxHeight: 1000,
    },
    lg: {
      quality: 0.9,
      maxWidth: 2000,
      maxHeight: 2000,
    },
  };

  return new Promise<{thumbnail: string; original: string}>((resolve, reject) => {
    try {
      // eslint-disable-next-line no-new
      new Compressor(imageBlob, {
        ...config[level],
        success: async (compressedBlob) => {
          const filePath = `topImages/${cuid()}.jpg`; // 拡張子を追加
          await putImage(compressedBlob, filePath);
          resolve({
            thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/${filePath}`,
            original: `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/${filePath}`,
          });
        },
        error(err) {
          useSnackbarStore.getState().handleOpen({
            message: '画像の圧縮に失敗しました',
            color: 'error',
          });
          reject(err);
        },
      });
    } catch (error) {
      useSnackbarStore.getState().handleOpen({
        message: '画像のアップロードに失敗しました',
        color: 'error',
      });
      reject(error);
    }
  });
};

export const uploadVideo = async (videoBlob: Blob, isIos: boolean) => {
  try {
    const fileName = cuid();
    const videoFilePath = `${fileName}.mp4`;
    const thumbnailFilePath = `topImages/${fileName}.jpg`;
    await putVideo(videoBlob, videoFilePath); // 動画も同様の関数でアップロード可能
    // サムネイルのアップロード
    const thumbnailBlob = isIos ? await createThumbnailFromImage(videoBlob) : await createThumbnailFromVideo(videoBlob);
    await putImage(thumbnailBlob, thumbnailFilePath, 'image/jpeg');

    return {
      thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/${thumbnailFilePath}`,
      original: `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/topImages/${videoFilePath}`,
    };
  } catch (error) {
    useSnackbarStore.getState().handleOpen({
      message: 'ビデオのアップロードに失敗しました',
      color: 'error',
    });
    throw error;
  }
};

const putVideo = async (file: Blob, pathname: string) => {
  const uploadParams: PutObjectCommandInput = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
    Key: pathname,
    Body: file,
    ContentType: 'video/mp4',
    ACL: 'public-read',
  };

  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);

  return `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/${pathname}`;
};

export const putImage = async (file: Blob, pathname: string, ContentType?: string) => {
  const uploadParams: PutObjectCommandInput = {
    Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME as string,
    Key: pathname,
    Body: file,
    ContentType: ContentType || 'image/jpeg',
    ACL: 'public-read',
  };

  const command = new PutObjectCommand(uploadParams);
  await client.send(command);

  return `${process.env.NEXT_PUBLIC_IMAGE_HOST_URL}/${pathname}`;
};

async function createThumbnailFromVideo(videoBlob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoBlob);

    video.addEventListener('canplay', async () => {
      try {
        video.currentTime = 1; // ビデオの適当な時間（例: 1秒）にシーク
      } catch (error) {
        reject(error);
      }
    });

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((thumbnailBlob) => {
          resolve(thumbnailBlob || videoBlob);
        }, 'image/jpeg');
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function createThumbnailFromImage(imageBlob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(imageBlob);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((thumbnailBlob) => {
          resolve(thumbnailBlob || imageBlob);
        }, 'image/jpeg');
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Image loading failed'));
    };
  });
}

// async function createThumbnailFromVideo(videoBlob: Blob): Promise<Blob> {
//   return new Promise((resolve, reject) => {
//     const video = document.createElement('video');
//     video.src = URL.createObjectURL(videoBlob);
//     video.addEventListener('canplay', () => {
//       try {
//         video.currentTime = Math.floor(video.duration / 2); // ビデオの中間点に設定
//       } catch (error) {
//         reject(error);
//       }
//     });

//     video.addEventListener('seeked', () => {
//       try {
//         const canvas = document.createElement('canvas');
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         canvas.toBlob((thumbnailBlob) => {
//           if (thumbnailBlob) {
//             resolve(thumbnailBlob);
//           } else {
//             reject(new Error('サムネイル生成エラー'));
//           }
//         }, 'image/jpeg');
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// }
