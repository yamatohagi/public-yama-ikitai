import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import {PostSearch} from 'src/sections/_post/search';

// sections

MountainDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MountainDetailPage() {
  return (
    <>
      <Head>
        <title>投稿 検索結果 - ヤマイキタイ</title>
      </Head>
      <PostSearch />
    </>
  );
}
