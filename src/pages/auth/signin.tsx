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

const LoginPage = ({csrfToken, providers, referer}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const methods = useSignForm();
  const {
    handleSubmit,
    formState: {isSubmitting, errors: formErrors},
  } = methods;
  const refererPath = referer ? new URL(referer).pathname : '/';

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
              {formErrors && <div style={{color: 'red'}}>{formErrors.email?.message}</div>}
              <div className={styles.cardContent}>
                {/* エラー */}
                {router.query.error && (
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      margin: '24px 0',
                      color: '#FA541C',
                    }}
                  >
                    {(ERROR_MSG as any)[router.query.error.toString()]}
                  </div>
                )}

                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                  }}
                >
                  SNSアカウントでログイン
                </div>
                {providers &&
                  Object.values(providers).map(
                    (provider) =>
                      provider.id !== 'email' && (
                        <div key={provider.id} style={{marginBottom: 0}}>
                          <FormProvider methods={methods} onSubmit={handleSubmit(() => signIn(provider.id, {callbackUrl: refererPath}))}>
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
                                {provider.name === 'Twitter' ? 'X(Twitter)でログイン' : `${provider.name}でログイン`}
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
                  }}
                >
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  メールアドレスでログイン
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
                    ログインする
                  </Button>
                </form>

                <hr />

                {/* 新規登録のページに飛ぶように作る */}
                <div>
                  <form
                    method="post"
                    action="/auth/signup"
                    style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                    }}
                  >
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        width: '100%',
                        marginBottom: '100px',
                        background: '#FFF',
                        border: '1.5px solid #636363', // 枠線を追加
                        color: '#323232',
                        '&:hover': {
                          boxShadow: 'none',
                          background: '#FFF', // ホバー時も同じ背景色を保持
                        },
                        '&:active': {
                          boxShadow: 'none',
                          background: darken('#FFF', 0.2), // アクティブ時は色を暗くする
                        },
                      }}
                    >
                      新規登録
                    </Button>
                  </form>
                </div>
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

  // 遷移元URLの取得
  const referer = context.req.headers.referer ?? null;

  if (session?.expires && session?.user) {
    return {redirect: {destination: '/'}};
  }

  const providers = await getProviders();

  return {
    props: {providers: providers ?? [], csrfToken, referer},
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

const ERROR_MSG = {
  OAuthAccountNotLinked: 'このメールアドレスは既に他のSNS経由で登録されています',
};
