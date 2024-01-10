// next
import {Provider} from 'jotai';
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import MtTrailheadDetail from 'src/sections/_trailhead/detail';

MtTrailheadPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtTrailheadPage() {
  return (
    <>
      <Head>
        <title>登山口詳細 - ヤマイキタイ</title>
      </Head>
      <Provider>
        <MtTrailheadDetail />
      </Provider>
    </>
  );
}

// todo: _mt-trailhead決してtrailheadにして
