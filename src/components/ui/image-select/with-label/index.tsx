/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable no-return-assign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable func-names */
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Box, Card, Typography, IconButton, Grid, Button, DialogActions, Dialog} from '@mui/material';
import {useAtom} from 'jotai';
import {useModal} from 'src/hooks/useModal';
import {ModalSlideTransition} from 'src/theme/etc';
import {useCallback, useEffect, useState} from 'react';
import Compressor from 'compressorjs';
import {createImage, getCroppedImg} from 'src/utils/cropImage';
import type {Area} from 'react-easy-crop';
import {CropModal} from 'src/components/crop-modal';
import {css} from 'styled-system/css';
import Modal from '../../../Modal';
import Iconify from '../../../iconify';
import {LabelSelect} from './c/label-select';
import {ImagesAndLabelAtom, OriginalImagesAtom} from './state';

type ImageSelectWithLabelProps = {
  labelMode?: boolean;
  limit?: number;
};
export default function ImageSelectWithLabel({labelMode = false, limit = 4}: ImageSelectWithLabelProps = {}) {
  const [isImgReading, setIsImgReading] = useState(false);
  const {openModal, isOpen, closeModal} = useModal({});
  const [images, setImages] = useAtom(ImagesAndLabelAtom);
  const [firstImageAspect, setFirstImageAspect] = useState<number | undefined>(undefined);
  const [originalImages, setOriginalImages] = useAtom(OriginalImagesAtom);
  const [cropProps, setCropProps] = useState<{
    croppedAreaPixels: Area;
    rotation: number;
    cropPreviewUrl: string;
    idIndex: number;
  } | null>(null);

  useEffect(() => {
    // imagesとoriginalImagesが同じ数じゃない場合は、originalImagesを更新する
    if (images.length !== originalImages.length) {
      genMedias(images.map((v) => v.previewUrl)).then((res) => setOriginalImages(res.originalImages));
    }
  }, [images]);

  useEffect(() => {
    // imagesがあるのにfirstImageAspectがない場合は、imagesの最初の画像のサイズを取得する

    (async () => {
      if (images.length > 0 && !firstImageAspect && originalImages[0].file) {
        const imageAspect = await loadImageSize(originalImages[0].file);

        setFirstImageAspect(imageAspect);
      }
    })();
  }, [originalImages]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsImgReading(true);

    const fileList = event.target.files;

    if (fileList === null) return;

    let files: Blob[] = Array.from(fileList);

    // 動画の場合は最初の一枚だけを取得 それいがいは削除
    if (files.some((file) => file.type.includes('video'))) {
      files = files.filter((file) => file.type.includes('video'));
      files = files.slice(0, 1);

      setImages([]); // 一旦全部削除
      setOriginalImages([]); // 一旦全部削除
    }

    if (files === null) return;
    // すでに設定されてる枚数と、選択された枚数を足して4枚を超えていたら合計4枚になるようにfilesをsliceする
    if (files.length + images.length > limit) files = files.slice(0, limit - images.length);

    // 画像のサイズを3000px以下にする
    files = await Promise.all(files.map((file) => getNormalizedFile(file)));

    const maxFileSize = 20 * 1024 * 1024; // 20MB
    if (!validateFileSize(files, maxFileSize, () => (event.target.value = ''))) {
      setImages([]);
      return; // サイズ制限を超えたファイルがあったため処理を終了
    }

    // 最初の画像のサイズを取得
    const imageAspect = await getMediaSize(files[0]).then((size) => size.width / size.height);

    setFirstImageAspect(imageAspect); // 途中から画像を追加した時に使う

    // 一枚目以降の画像は、一枚目の画像のサイズに合わせる
    const {croppedImages, originalImages} = await resizeImages(files, firstImageAspect || imageAspect);

    // その時originalを保存しておく
    setOriginalImages(originalImages);

    setImages((prevImages) =>
      prevImages.concat(
        croppedImages.map((obj) => {
          const {file} = obj;
          const previewUrl = URL.createObjectURL(file);

          return {
            blobFile: file,
            previewUrl,
            dbPhotoId: null,
            type: file.type.includes('video') ? 'VIDEO' : 'PHOTO',
            width: 0, // upの時入るので0でいい
            height: 0,
            labels: [],
          };
        })
      )
    );
    setIsImgReading(false);
  };

  const handleRemoveImage = (imageIndex: number) => {
    // 画像を削除
    setImages((prevImages) => prevImages.filter((_, idx) => idx !== imageIndex));
    // originalImagesも削除
    setOriginalImages((prevImages) => prevImages.filter((_, idx) => idx !== imageIndex));
    // 画像が0枚になったら最初の画像のサイズをリセット
    if (images.length === 1) setFirstImageAspect(undefined);
  };

  const CroppedImageSave = async (croppedAreaPixels: Area, rotation: number, idIndex?: number) => {
    if (idIndex === undefined) return;
    const blob = await getCroppedImg(cropProps?.cropPreviewUrl || '', croppedAreaPixels, rotation, 'test');
    const url = URL.createObjectURL(blob);

    // cropした場合idは消す
    setImages((prev) => {
      const newImages = [...prev];
      newImages[idIndex].dbPhotoId = null;
      newImages[idIndex].blobFile = blob;
      newImages[idIndex].previewUrl = url;
      return newImages;
    });
    // originalImagesも更新
    setOriginalImages((prev) => {
      const newImages = [...prev];
      newImages[idIndex].cropArea = croppedAreaPixels;
      return newImages;
    });
    setCropProps(null);
  };

  const imageTap = async (index: number) => {
    const imageDataUrl = await readFile(originalImages[index].file);
    setCropProps({
      croppedAreaPixels: originalImages[index].cropArea,
      rotation: 0,
      cropPreviewUrl: imageDataUrl as string,
      idIndex: index,
    });
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
  const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    setIsIos(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  // なぜかiosだと動画が再生されないので、iosの場合はvideoタグを使わない

  return (
    <Box>
      <Dialog maxWidth="sm" open={!!cropProps}>
        {cropProps && (
          <CropModal
            width={cropProps.croppedAreaPixels.width}
            cropAspect={firstImageAspect || 1}
            height={cropProps.croppedAreaPixels.height}
            cropAreaPixels={cropProps.croppedAreaPixels}
            idIndex={cropProps.idIndex}
            photoURL={cropProps.cropPreviewUrl}
            disabled={false}
            closeCrop={() => setCropProps(null)}
            saveImage={CroppedImageSave}
          />
        )}
      </Dialog>

      <Typography variant="subtitle2" color="#323232" align="left">
        画像登録（10MB以下、動画は一枚のみ）
      </Typography>

      <Grid container spacing={1} style={{paddingTop: 15}}>
        {/* タグづけのモーダル */}
        <Modal open={isOpen} onClose={closeModal} dialogProps={{fullScreen: true, TransitionComponent: ModalSlideTransition}} width="100%">
          {isOpen && <LabelSelect urls={images.map((v) => v.previewUrl)} />}
          <DialogActions>
            <IconButton edge="start" style={{color: '#212B36'}} onClick={closeModal} aria-label="close" sx={{flex: 2}}>
              <Iconify icon="ic:baseline-close" width={33} style={{verticalAlign: 'middle', color: 'gray'}} />
            </IconButton>
            <Button
              onClick={closeModal}
              fullWidth
              className={css({
                background: '#367B9D',
              })}
              sx={{flex: 10}}
              size="large"
              variant="contained"
            >
              完了
            </Button>
          </DialogActions>
        </Modal>

        {/* 画像リスト */}
        {images.length > 0 &&
          images.map((url, index) => (
            <Grid item xs={6} key={index}>
              <Box key={index} sx={{position: 'relative', paddingBottom: '100%', overflow: 'hidden'}}>
                <Card sx={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
                  {(url.blobFile?.type.includes('video') || url.previewUrl.includes('mp4')) && !isIos ? (
                    <video
                      muted
                      autoPlay
                      playsInline
                      loop
                      onClick={() => imageTap(index)}
                      style={{objectFit: 'contain', width: '100%', height: '100%', backgroundColor: 'gray'}}
                      src={url.previewUrl}
                    />
                  ) : (
                    <img
                      alt="preview"
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          imageTap(index);
                        }
                      }}
                      onClick={() => imageTap(index)}
                      referrerPolicy="no-referrer"
                      style={{objectFit: 'contain', width: '100%', height: '100%', backgroundColor: 'gray'}}
                      src={url.previewUrl}
                    />
                  )}
                  {/* <CardMedia
                    referrerpolicy="no-referrer"
                    // 読み込み長いから
                    muted
                    autoPlay
                    playsInline
                    loop
                    onClick={() => !(url.blobFile?.type.includes('video') || url.previewUrl.includes('mp4')) && imageTap(index)}
                    component={(url.blobFile?.type.includes('video') || url.previewUrl.includes('mp4')) && !isIos ? 'video' : 'img'}
                    //   component="image"
                    image={url.previewUrl}
                    sx={{objectFit: 'contain', width: '100%', height: '100%', backgroundColor: 'gray', referrerpolicy: 'no-referrer'}}
                  /> */}
                  <IconButton sx={{position: 'absolute', top: 8, right: 0}} onClick={() => handleRemoveImage(index)}>
                    <Iconify icon="clarity:remove-solid" sx={{width: 30, height: 30}} color="#FFF" />
                  </IconButton>
                </Card>
              </Box>
            </Grid>
          ))}

        {/* 画像選択 */}
        {images.length < limit && images.every((image) => !(image.blobFile?.type.includes('video') || image.previewUrl.includes('mp4'))) && (
          <Grid item xs={12}>
            {isImgReading ? (
              <Typography variant="caption">読み込み中...</Typography>
            ) : (
              <IconButton
                className={css({
                  background: '#DFE3E8',
                })}
                sx={{
                  borderRadius: 1,
                  backgroundColor: (theme) => theme.palette.grey[300],
                }}
              >
                <Iconify icon="material-symbols:image-outline" sx={{width: 40, height: 40}} />
                <input multiple type="file" onChange={handleFileChange} style={{opacity: 0, position: 'absolute'}} />
              </IconButton>
            )}
          </Grid>
        )}
        {/* ボタン */}
        {labelMode && images.length > 0 && (
          <Button
            variant="contained"
            className={css({
              background: '#367B9D',
            })}
            onClick={openModal}
          >
            写真にラベルをつける
          </Button>
        )}
      </Grid>
    </Box>
  );
}

const getNormalizedFile = (file: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // 動画の場合はそのまま返す
    if (file.type.includes('video')) {
      resolve(file);
      return;
    }
    // eslint-disable-next-line no-new
    new Compressor(file, {
      maxWidth: 2000,
      maxHeight: 2000,
      success(normalizedFile) {
        resolve(normalizedFile);
      },
      error(error) {
        resolve(file);
      },
    });
  });
};

const resizeImages = async (
  originalFiles: Blob[],
  firstImageAspect: number
): Promise<{croppedImages: {file: Blob; cropArea: Area}[]; originalImages: {file: Blob; cropArea: Area}[]}> => {
  const croppedImages: {file: Blob; cropArea: Area}[] = [];
  const originalImages: {file: Blob; cropArea: Area}[] = [];

  for (const file of originalFiles) {
    // 動画の場合はそのまま返す widthとheightだけは入れておく
    if (file.type.includes('video')) {
      const {width, height} = await getMediaSize(file);

      croppedImages.push({file, cropArea: {x: 0, y: 0, width, height}});
      originalImages.push({file, cropArea: {x: 0, y: 0, width, height}});
      return {croppedImages, originalImages};
    }
    const url = URL.createObjectURL(file);
    const image = await createImage(url); // 画像オブジェクトを生成
    const aspectRatio = image.width / image.height;
    let cropWidth;
    let cropHeight;

    if (aspectRatio > firstImageAspect) {
      // 元の画像の幅が相対的に大きい場合
      cropWidth = image.height * firstImageAspect;
      cropHeight = image.height;
    } else {
      // 元の画像の高さが相対的に大きい場合
      cropWidth = image.width;
      cropHeight = image.width / firstImageAspect;
    }

    const cropArea = {
      x: (image.width - cropWidth) / 2,
      y: (image.height - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight,
    };

    const croppedImage = await getCroppedImg(url, cropArea, 0, 'cropped.jpg');

    croppedImages.push({file: croppedImage, cropArea});
    originalImages.push({file, cropArea});
    URL.revokeObjectURL(url); // 不要になったURLを解放
  }

  return {croppedImages, originalImages};
};

// resizeImagesを元に、リサイズはせずにurlから画像を生成する関数
const genMedias = async (
  urls: string[]
): Promise<{croppedImages: {file: Blob; cropArea: Area}[]; originalImages: {file: Blob; cropArea: Area}[]}> => {
  const croppedImages: {file: Blob; cropArea: Area}[] = [];
  const originalImages: {file: Blob; cropArea: Area}[] = [];
  for (const url of urls) {
    const image = await toBlobMediaFromUrl(url); // 画像オブジェクトを生成
    const {width, height} = await getMediaSize(image).then((size) => ({width: size.width, height: size.height}));

    const cropArea = {
      x: 0,
      y: 0,
      width,
      height,
    };

    croppedImages.push({file: image, cropArea});
    originalImages.push({file: image, cropArea});
    // URL.revokeObjectURL(url); これのせいで画像が表示されなくなる labelのとこで
  }
  return {croppedImages, originalImages};
};

const loadImageSize = (imageFile: Blob): Promise<number> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      resolve(img.width / img.height);
    };
    img.onerror = function (e) {
      resolve(img.width / img.height);
    };
    img.src = URL.createObjectURL(imageFile);
  });
};

const validateFileSize = (files: Blob[], maxFileSize: number, resetInput: () => void): boolean => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > maxFileSize) {
      alert('選択されたファイルはサイズ制限を超えています。');
      resetInput(); // ファイル選択をリセット
      return false;
    }
  }
  return true;
};

export async function getMediaSize(src: Blob): Promise<MediaSize> {
  let size: MediaSize = {width: 0, height: 0};
  if (!src) {
    return size;
  }

  try {
    if (src.type.includes('image/')) {
      const image = await loadImageFromBlob(src); // 画像の場合
      size = {width: image.naturalWidth, height: image.naturalHeight};
    } else if (src.type.includes('video/')) {
      const video = await loadVideoFromBlob(src); // 動画の場合

      size = {width: video.videoWidth, height: video.videoHeight};
    }
  } catch (error) {
    console.error('Media loading error: ', error);
  }

  return size;
}

// const img: HTMLImageElementを返す関数 画像か動画かによって返すものが違う
export function createMedia(blob: Blob): Promise<HTMLImageElement | HTMLVideoElement> {
  if (blob.type.includes('image/')) {
    return loadImageFromBlob(blob);
  }
  return loadVideoFromBlob(blob);
}

// Blobから画像をロードする関数
function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

// Blobから動画をロードする関数
function loadVideoFromBlob(blob: Blob): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(video);
    };
    video.onerror = reject;
    video.src = url;
    video.load();
  });
}

// urlからMediaをロードしてblobを生成する関数
async function toBlobMediaFromUrl(url: string): Promise<Blob> {
  // Fetch APIを使用して、URLからレスポンスを取得
  const response = await fetch(`${url}`, {cache: 'no-cache', referrerPolicy: 'no-referrer'});

  // レスポンスが正常でなければエラーを投げる
  if (!response.ok) {
    throw new Error(`Error fetching image: ${response.statusText}`);
  }

  // レスポンスの本体をBlobとして取得
  const blob = await response.blob();

  return blob;
}

// loadVideoFromUrlとloadImageFromUrlを使いurl[]からblob[]を生成する関数

type MediaSize = {width: number; height: number};
