// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import UserDetail from 'src/sections/_user/detail';

UserDetailPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function UserDetailPage() {
  return (
    <>
      <Head>
        <title>小屋詳細 - ヤマイキタイ</title>
      </Head>
      <UserDetail />
    </>
  );
}
