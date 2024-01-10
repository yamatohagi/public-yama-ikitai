import {GetServerSidePropsContext} from 'next';
import MainLayout from 'src/layouts/main';
import TrailheadDetailPhoto from 'src/sections/_trailhead/detail/sections/photo';

MtPhotoPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtPhotoPage({initialTab, query}: {initialTab: string; query: any}) {
  return <TrailheadDetailPhoto initialTab={initialTab} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const initialTab = Array.isArray(context.query.tab) ? context.query.tab[0] : context.query.tab?.toString() || '登山口に関連する写真';

  // 必要に応じて、他のpropsもここでフェッチしてください

  return {
    props: {
      initialTab,
      query: context.query,
    },
  };
}
