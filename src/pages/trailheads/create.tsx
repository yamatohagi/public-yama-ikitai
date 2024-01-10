// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
import TrailheadCreate from 'src/sections/_trailhead/create';

// sections

MountainCreatePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MountainCreatePage() {
  return (
    <>
      <Head>
        <title>登山口の登録 - ヤマイキタイ</title>
      </Head>
      <TrailheadCreate />
    </>
  );
}
