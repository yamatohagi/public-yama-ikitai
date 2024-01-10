import {Grid, Skeleton} from '@mui/material';
import SiteTitle from 'src/components/ui/SiteTitle';
import {useRouter} from 'next/router';
import MtFeatureImageUi from './c/MtFeatureImageUi';
import GetMtFeatureImage from './api';

export default function MtFeatureImage() {
  const {photos, id, refetch, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage} = GetMtFeatureImage();
  const router = useRouter();
  const {mountainName, featureName} = router.query;

  if (photos === undefined) {
    return (
      <Grid container>
        <Skeleton variant="rectangular" width={300} height={300} />
      </Grid>
    );
  }

  return (
    <Grid container>
      {/* 山の名前と、投稿しようとしているハッシュタグ */}
      <SiteTitle name={`#${mountainName}${' '}#${featureName}`} />

      {/* 画像の表示 */}
      <Grid item xs={12} sm={12}>
        {photos && (
          <MtFeatureImageUi
            searchedPhotoItems={photos}
            title={featureName?.toString() || ''}
            id={id}
            refetch={refetch}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </Grid>
    </Grid>
  );
}
