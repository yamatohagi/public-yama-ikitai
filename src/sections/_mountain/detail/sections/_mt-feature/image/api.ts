import {useRouter} from 'next/router';
import {trpc} from 'src/utils/trpc';

export default function GetMtFeatureImage() {
  const router = useRouter();
  const {id, featureName} = router.query;

  // mtIdとfeatureNameがないときは、何も表示しない

  const {data, refetch, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage} = trpc.photo.findManyPhoto.useInfiniteQuery(
    {mtId: Number(id), hashtags: [featureName?.toString() || '']},
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
      enabled: !!id && !!featureName,
    }
  );

  const photos = data?.pages.flatMap((page) => ('photos' in page ? page.photos : page));

  return {photos, title: featureName?.toString() || '', id: Number(id), refetch, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage};
}
