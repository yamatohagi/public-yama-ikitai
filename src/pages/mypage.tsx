// next
import Head from 'next/head';
import {useEffect} from 'react';
import {useSession} from 'next-auth/react';
// layouts
import MainLayout from 'src/layouts/main';
import UserDetail from 'src/sections/_user/detail';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';

MyPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MyPage() {
  const router = useRouter();
  const {data: session, status} = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (status === 'unauthenticated') router.push(paths.login.path);
  }, [status]);

  return (
    <>
      <Head>
        <title>マイページ - ヤマイキタイ</title>
      </Head>
      <UserDetail myPageUserId={userId} />
    </>
  );
}
