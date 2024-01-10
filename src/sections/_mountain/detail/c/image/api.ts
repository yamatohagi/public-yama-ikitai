import {MediaType, Prisma} from '@prisma/client';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {GetMtPhotosTspAtom} from './state';

export function GetMtPhotos() {
  const [tsp] = useAtom(GetMtPhotosTspAtom);
  const router = useRouter();
  const mtId = Number(router.query.id);
  const query = {
    where: {mountainId: mtId},
    include: {Photo: {select: {thumbnail: true, original: true, type: true}}},
  };
  //* データ取得 *//
  type SomeType = Prisma.MountainToPhotoGetPayload<typeof query>;
  const {data: mtPhotos, refetch} = trpc.mtPhotos.findMany.useQuery<any, SomeType[]>(query, {
    enabled: !!mtId,
  });

  useEffect(() => {
    refetch();
  }, [tsp]);
  // mtPhotosの中身をimagesに変換する
  const data: ImageGalleryType =
    mtPhotos?.map((mtPhoto) => ({
      original: mtPhoto.Photo.original,
      thumbnail: mtPhoto.Photo.thumbnail,
      type: mtPhoto.Photo.type,
    })) ||
    [...Array(1)].map((i) => ({
      original: '/assets/images/loading/loading_move.svg',
      thumbnail: '/assets/images/loading/loading_move.svg',
      type: 'PHOTO',
    }));

  return {data};
}
type ImageGalleryType = Array<{original: string; thumbnail: string; type: MediaType}> | undefined;
