// next
import {Provider} from 'jotai';
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import MtFacilityDetail from 'src/sections/_mt-facility/detail';

MtFacilityPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtFacilityPage() {
  return (
    <>
      <Head>
        <title>小屋詳細 - ヤマイキタイ</title>
      </Head>
      <Provider>
        <MtFacilityDetail />
      </Provider>
    </>
  );
}
