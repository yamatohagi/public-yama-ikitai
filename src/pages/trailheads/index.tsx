import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
import {TrailheadSearch} from 'src/sections/_trailhead/search';

// sections

TrailheadSearchPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function TrailheadSearchPage({initialTab, query}: {initialTab: string; query: any}) {
  return (
    <>
      <Head>
        <title>投稿 検索結果 - ヤマイキタイ</title>
      </Head>
      <TrailheadSearch />
    </>
  );
}
