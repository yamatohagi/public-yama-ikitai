import {useRouter} from 'next/router';
import {trpc} from 'src/utils/trpc';

export default function GetMtFacilityFeatureImage() {
  const router = useRouter();
  const id = Number(router.query.id);
  const title = router.query.name?.toString() || '';

  const {data, refetch, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage} = trpc.photo.findManyPhoto.useInfiniteQuery(
    {
      facilityId: id,
      hashtags: [title],
      limit: 15,
    },
    {
      enabled: !!router.isReady,
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );

  const photos = data?.pages.flatMap((page) => ('photos' in page ? page.photos : page));

  return {photos, title, id, refetch, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage};
}
