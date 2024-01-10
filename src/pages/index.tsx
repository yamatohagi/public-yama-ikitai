// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';

import HomeView from 'src/sections/_home';
// sections

HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default function HomePage() {
  return (
    <>
      <Head>
        <title>ジムイキタイ | Climb Bond</title>
      </Head>

      <HomeView />
    </>
  );
}
