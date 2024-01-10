import {MediaType} from '@prisma/client';
import {atom} from 'jotai';
import type {Area} from 'react-easy-crop';

type ImageWithLabel = {
  blobFile: Blob | null;
  previewUrl: string;
  dbPhotoId: number | null;
  width: number;
  type: MediaType;
  height: number;
  labels?: {
    x: number;
    y: number;
    text: string;
    index: number;
    mtId: number | null;
  }[];
};

export const ImagesAndLabelAtom = atom<ImageWithLabel[]>([]);

export const OriginalImagesAtom = atom<{file: Blob; cropArea: Area}[]>([]);
