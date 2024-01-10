// next
import {GetServerSidePropsContext} from 'next';
import {getCsrfToken} from 'next-auth/react';
import Head from 'next/head';
import {authOptions} from 'server/auth';
// layouts
import MainLayout from 'src/layouts/main';
import MountainCreate from 'src/sections/_mountain/create';
import {getServerSession} from 'next-auth/next';
import {paths} from 'src/routes/paths';

// sections

MountainCreatePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function MountainCreatePage() {
  return (
    <>
      <Head>
        <title>山の登録 - ヤマイキタイ</title>
      </Head>
      <MountainCreate />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions());
  const csrfToken = await getCsrfToken(context);

  if (!session?.user.id) {
    return {redirect: {destination: paths.login.path}};
  }
  return {
    props: {csrfToken},
  };
}
