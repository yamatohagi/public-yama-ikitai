import Head from 'next/head';
import Link from 'next/link';
import MainLayout from 'src/layouts/main';
import {trpc} from 'src/utils/trpc';

// sections

ConsolePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function ConsolePage() {
  const {data} = trpc.mountains.findManyOld.useQuery({
    where: {
      approvalAt: {
        equals: null,
      },
      applicationAt: {
        not: null,
      },
    },
  });

  return (
    <>
      <Head>
        <title>管理画面 - ヤマイキタイ</title>
      </Head>
      <div>
        <h1>管理画面</h1>
        山一覧
        <ul>
          {data?.map((mountain) => (
            <Link key={mountain.id} href={`/console/mt/${mountain.id}?${mountain.originId ? `originId=${mountain.originId}` : ''}`}>
              <li key={mountain.id}>{mountain.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
