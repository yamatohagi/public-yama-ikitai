// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import MtFacilityCreate from 'src/sections/_mt-facility/create';

// sections

MtFacilityCreatePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtFacilityCreatePage() {
  return (
    <>
      <Head>
        <title>小屋の登録 - ヤマイキタイ</title>
      </Head>
      <MtFacilityCreate />
    </>
  );
}
