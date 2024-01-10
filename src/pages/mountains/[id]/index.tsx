// next
import {Provider} from 'jotai';
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import MountainDetailView from 'src/sections/_mountain/detail';
// sections

MountainDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MountainDetailPage() {
  return (
    <>
      <Head>
        <title>山の登録 - ヤマイキタイ</title>
      </Head>
      <Provider>
        <MountainDetailView />
      </Provider>
    </>
  );
}
