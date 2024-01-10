import {GetServerSidePropsContext, InferGetServerSidePropsType} from 'next';
import {signIn, getCsrfToken, getProviders} from 'next-auth/react';
import {getServerSession} from 'next-auth/next';
import Image from 'next/image';
import {Button, TextField, Link, darken} from '@mui/material';
import {authOptions} from 'server/auth';
import NextLink from 'next/link';
import {trpc} from 'src/utils/trpc';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import FormProvider from 'src/components/hook-form/FormProvider';
import {useRouter} from 'next/router';
import styles from './Signin.module.css';

const LoginPage = ({csrfToken, providers}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const methods = useSignForm();
  const {
    handleSubmit,
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const router = useRouter();
  // ?next-auth-callback-url=testって感じで入ってる
  const refererFullPath = router.query?.['next-auth-callback-url']?.toString();
  const refererPath = refererFullPath ? new URL(refererFullPath).pathname : '/';

  return (
    <div className="signin">
      <div className="card">
        <div style={{overflow: 'hidden', position: 'relative'}}>
          {/* <Header /> */}
          <div className={styles.content}>
            <div className={styles.cardWrapper}>
              <Link component={NextLink} href="/" color="inherit" aria-label="go to homepage" sx={{lineHeight: 0}}>
                <Image
                  unoptimized
                  src="/assets/logo-main/logo.svg"
                  height="64"
                  width={300}
                  alt="App Logo"
                  style={{height: '60px', marginBottom: '20px', cursor: 'pointer'}}
                />
              </Link>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  margin: '2rem',
                  color: '#FA541C',
                }}
              >
                アカウントを作成してください。
              </div>
              {formErrors && <div style={{color: 'red'}}>{formErrors.email?.message}</div>}
              <div className={styles.cardContent}>
                <div
                  style={{
                    marginBottom: '1rem',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  SNSアカウントで新規登録
                </div>
                {providers &&
                  Object.values(providers).map(
                    (provider) =>
                      provider.id !== 'email' && (
                        <div key={provider.id} style={{marginBottom: 0}}>
                          <FormProvider methods={methods} onSubmit={handleSubmit(() => signIn(provider.id, {callbackUrl: refererPath}, 'hogehoge'))}>
                            <Button
                              type="submit"
                              sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                width: '100%',
                                marginBottom: '8px',

                                color: provider.id === 'google' ? '#323232' : '#FFFFFF', // Googleは黒文字
                                border: provider.id === 'google' ? '1px solid #C0C0C0' : 'none', // Googleの場合だけ枠線を追加
                                '&:hover': {
                                  boxShadow: 'none',
                                  background: providerBackgroundColor(provider.id), // ホバー時も同じ背景色を保持
                                },
                                '&:active': {
                                  boxShadow: 'none',
                                  background: darken(providerBackgroundColor(provider.id), 0.2), // アクティブ時は色を暗くする
                                },
                              }}
                              style={{background: providerBackgroundColor(provider.id)}}
                              variant="contained"
                            >
                              <Image
                                unoptimized
                                src={providerImage(provider.id)}
                                height={provider.id === 'line' ? '30' : '24'} // LINEの場合は高さ30、それ以外は24
                                width={provider.id === 'line' ? '30' : '24'} // LINEの場合は幅30、それ以外は24
                                alt={`${provider.name} Logo`}
                              />
                              <span style={{flexGrow: 1, textAlign: 'center'}}>
                                {provider.name === 'Twitter' ? 'X(Twitter)でアカウント作成' : `${provider.name}でアカウント作成`}
                              </span>{' '}
                            </Button>
                          </FormProvider>
                        </div>
                      )
                  )}
                <hr />
                <form
                  method="post"
                  action="/api/auth/signin/email"
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: '1rem',
                  }}
                >
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  メールアドレスで新規登録
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    variant="outlined"
                    placeholder="yama-ikitai@example.com"
                    sx={{width: '100%', marginBottom: '16px', marginTop: '1rem'}}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    style={{background: '#205676'}}
                    sx={{
                      width: '100%',

                      '&:hover': {
                        boxShadow: 'none',
                        background: '#205676', // ホバー時も同じ背景色を保持
                      },
                      '&:active': {
                        boxShadow: 'none',
                        background: darken('#205676', 0.2), // アクティブ時は色を暗くする
                      },
                    }}
                  >
                    アカウントを作成する
                  </Button>
                </form>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions());
  const csrfToken = await getCsrfToken(context);

  if (session?.expires && session?.user) {
    return {redirect: {destination: '/'}};
  }

  const providers = await getProviders();

  return {
    props: {providers: providers ?? [], csrfToken},
  };
}

const providerImage = (id: string) => {
  if (id === 'google') {
    return 'https://authjs.dev/img/providers/google.svg';
  }
  if (id === 'line') {
    return '/assets/icons/service/lineimage.svg';
  }
  if (id === 'twitter') {
    return '/assets/icons/service/twitterimage.svg';
  }

  return 'https://authjs.dev/img/providers/email.svg';
};

const providerBackgroundColor = (id: string) => {
  switch (id) {
    case 'google':
      return '#FFFFFF'; // Googleの場合は白色
    case 'line':
      return '#00B900'; // Lineの場合は緑色
    case 'twitter':
      return '#323232';
    default:
      return '#808080'; // デフォルトはグレー
  }
};

function useSignForm() {
  const scheme = GetSchema();

  const MtFacilityFormMethods = useForm({
    resolver: zodResolver(scheme),

    defaultValues: {
      email: '',
    },
  });
  return MtFacilityFormMethods;
}

function GetSchema(excludeId?: string) {
  const baseSchema = z.object({
    email: z.string(),
  });
  const utils = trpc.useUtils();
  const f = utils.user.checkExistEmail.fetch;
  const schema = baseSchema.refine(
    async (data) => {
      const response = await f({email: data.email});
      return !response?.id;
    },
    {
      message: '新規登録からお願いします。',
      path: ['email'],
    }
  );
  return schema;
}
