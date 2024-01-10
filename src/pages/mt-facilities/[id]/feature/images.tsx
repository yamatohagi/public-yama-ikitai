// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import MtFacilityFeatureImage from 'src/sections/_mt-facility/detail/sections/feature/image';

MtFacilityFeatureImagePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtFacilityFeatureImagePage() {
  return (
    <>
      <Head>
        <title>小屋の画像 - ヤマイキタイ</title>
      </Head>
      <MtFacilityFeatureImage />
    </>
  );
}
