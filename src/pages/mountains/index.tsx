// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import {MtSearch} from 'src/sections/_mountain/search';

// sections

MountainDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MountainDetailPage() {
  return (
    <>
      <Head>
        <title>山 検索結果 - ヤマイキタイ</title>
      </Head>
      <MtSearch />
    </>
  );
}
