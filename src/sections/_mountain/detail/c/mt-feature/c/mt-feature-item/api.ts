import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {MtFeatureItemPhotoGetTspAtom} from './state';
import {GetMtFeaturesTspAtom} from '../../state';

type MtFeatureItemPhotoGetProps = {
  mtId: number;
  hashtags: string[];
};

export function MtFeatureItemPhotoGet({mtId, hashtags}: MtFeatureItemPhotoGetProps) {
  const [refetchTimeStamp] = useAtom(MtFeatureItemPhotoGetTspAtom);

  const {data: rPost, refetch} = trpc.post.findManyPhotoHashtag.useQuery({
    mountainId: mtId,
    hashtags,
    take: 6,
    skip: 0,
  });

  useEffect(() => {
    refetch();
  }, [refetchTimeStamp]);

  const photos = rPost && 'photos' in rPost ? rPost?.photos : undefined;

  const searchedPhotoItems = photos?.map((photo) => ({
    type: photo.Photo_type,
    original: photo.Photo_original,
    thumbnail: photo.Photo_thumbnail,
    width: photo.Photo_width,
    height: photo.Photo_height,
    title: photo.Photo_title,
    postId: photo.Photo_postId,
    uploadStatus: photo.Photo_uploadStatus,
  }));

  return {photos: searchedPhotoItems};
}

type RatingHistoryGetProps = {
  userId: string | undefined;
  featureName: string;
};
export function RatingHistoryGet({userId, featureName}: RatingHistoryGetProps) {
  const [refetchTimeStamp] = useAtom(GetMtFeaturesTspAtom);

  const {data, refetch} = trpc.mtFeatureRating.findAlready.useQuery({
    userId,
    featureName,
  });

  useEffect(() => {
    refetch();
  }, [refetchTimeStamp]);

  return {data};
}
