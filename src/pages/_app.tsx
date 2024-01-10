import Head from 'next/head';
import ThemeProvider from 'src/theme';
import ProgressBar from 'src/components/progress-bar/ProgressBar';
import {AppProps, AppType} from 'next/app';
import {NextPage} from 'next';
import useGtm from 'src/hooks/useGtm';
import {CSnackbar} from 'src/components/provider/CSnackbar';
import {SessionProvider, useSession} from 'next-auth/react';
import '../styles/globals.css';
import {trpc} from 'src/utils/trpc';
import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {useRouter} from 'next/router';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {paths} from 'src/routes/paths';
import './index.css';
import Iconify from 'src/components/iconify';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp: AppType = (props: any) => {
  useGtm();

  const {Component, pageProps, session} = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <SessionProvider session={session}>
      <div style={{display: 'none'}}>
        <Iconify icon="majesticons:home" width={0} color="#205676" />
        <Iconify icon="majesticons:home-line" width={0} color="#205676" />
        <Iconify icon="iconamoon:search-bold" width={0} color="#205676" />
        <Iconify icon="iconamoon:search" width={0} color="#205676" />
        <Iconify icon="foundation:mountains" width={0} color="#205676" />
        <Iconify icon="mdi:bell" width={0} color="#205676" />
        <Iconify icon="mdi:bell-outline" width={0} color="#205676" />
        <Iconify icon="mdi:user-circle" width={0} color="#205676" />
        <Iconify icon="mdi:user-circle-outline" width={0} color="#205676" />
      </div>
      {/* <ReactQueryDevtools /> */}
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1, user-scalable=0" />
      </Head>

      <ThemeProvider>
        <ProgressBar />
        <Auth />
        {getLayout(<Component {...pageProps} />)}
        <CSnackbar />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

function Auth() {
  const router = useRouter();
  const {data: session} = useSession();

  const user = session?.user;

  const [value, setValue] = useAtom(testATom);

  // user.hasEmailがfalseの時はメールアドレス登録画面に飛ばす
  useEffect(() => {
    if (!router.isReady || !user || !!user.hasEmail || !!user.emailVerificationEmailSent || !!value) return;
    if (router.pathname === paths.auth.emailSetting.path) return;

    setValue(true);

    router.push(`${paths.auth.emailSetting.path}?email-set-redirect=${router.asPath}`);
  }, [router.isReady, user]);

  return <></>;
}

// メールアドレス登録は一回だけ促す、そのほかはログアウト状態にする

const testATom = atomWithStorage<boolean>(
  'testATom',
  false,
  createJSONStorage(() => sessionStorage)
);
