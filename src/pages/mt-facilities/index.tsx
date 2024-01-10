import Head from 'next/head';

// layouts
import MainLayout from 'src/layouts/main';
import MtFacilitySearch from 'src/sections/_mt-facility/search';

// sections

MtFacilitySearchPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtFacilitySearchPage({initialTab, query}: {initialTab: string; query: any}) {
  return (
    <>
      <Head>
        <title>山小屋 検索結果 - ヤマイキタイ</title>
      </Head>
      <MtFacilitySearch />
    </>
  );
}
