// next
import {Provider} from 'jotai';
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import {PostDetail} from 'src/sections/_post/detail';

PostPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function PostPage() {
  return (
    <>
      <Head>
        <title>登山口詳細 - ヤマイキタイ</title>
      </Head>
      <Provider>
        <PostDetail />
      </Provider>
    </>
  );
}
