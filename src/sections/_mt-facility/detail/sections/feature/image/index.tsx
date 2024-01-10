import {Grid} from '@mui/material';
import SiteTitle from 'src/components/ui/SiteTitle';

import {useRouter} from 'next/router';
import GetMtFacilityFeatureImage from './api';
import MtFeatureImageUi from './c/MtFeatureImageUi';

export default function MtFacilityFeatureImage() {
  const {photos, title, id, refetch, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage} = GetMtFacilityFeatureImage();
  const router = useRouter();
  const {mtFacilityName} = router.query;

  return (
    <Grid container>
      <SiteTitle name={`#${mtFacilityName}${'　'}#${title}`} />
      <Grid item xs={12} sm={12}>
        <MtFeatureImageUi
          searchedPhotoItems={photos}
          title={title}
          id={id}
          refetch={refetch}
          fetchNextPage={fetchNextPage}
          isLoading={isLoading}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Grid>
    </Grid>
  );
}
