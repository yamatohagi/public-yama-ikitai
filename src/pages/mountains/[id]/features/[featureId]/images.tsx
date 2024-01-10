// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import MtFeatureImage from 'src/sections/_mountain/detail/sections/_mt-feature/image';

// sections

MtFeatureImagePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtFeatureImagePage() {
  return (
    <>
      <Head>
        <title>山の登録 - ヤマイキタイ</title>
      </Head>
      <MtFeatureImage />
    </>
  );
}
