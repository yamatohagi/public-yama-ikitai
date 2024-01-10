import {GetServerSidePropsContext} from 'next';
import MainLayout from 'src/layouts/main';
import MtDetailPhoto from 'src/sections/_mountain/detail/sections/photo';

MtPhotoPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MtPhotoPage({initialTab, query}: {initialTab: string; query: any}) {
  return <MtDetailPhoto initialTab={initialTab} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const initialTab = Array.isArray(context.query.tab) ? context.query.tab[0] : context.query.tab?.toString() || 'media';

  // 必要に応じて、他のpropsもここでフェッチしてください

  return {
    props: {
      initialTab,
      query: context.query,
    },
  };
}
