import {MtFacility} from '@prisma/client';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {trpc} from 'src/utils/trpc';

export const FacilitySpecificsItemImageGet = (title: string) => {
  const router = useRouter();
  const id = Number(router.query.id);

  const {data, refetch, isLoading} = trpc.photo.findManyPhoto.useQuery(
    {
      facilityId: id,
      hashtags: [title],
      limit: 4,
    },
    {
      enabled: !!router.isReady,
    }
  );
  return {data: data?.photos, refetch, isLoading};
};

// すでhistoryにuserIdがあるかどうか
export const AlreadyHistory = (title: string, ratingColumnName: keyof MtFacility) => {
  const {data: session} = useSession();
  const userId = session?.user?.id;

  const router = useRouter();
  const id = Number(router.query.id);
  const {data, refetch} = trpc.ratingHistory.isExist.useQuery({
    where: {mtFacilityId: id, idName: title, userId},
  });
  return {data, refetch};
};
