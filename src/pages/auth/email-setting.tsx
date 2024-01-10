import {zodResolver} from '@hookform/resolvers/zod';
import {Button, TextField, darken, Link} from '@mui/material';
import {useForm} from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import {trpc} from 'src/utils/trpc';
import {z} from 'zod';
import {signIn} from 'next-auth/react';
import NextLink from 'next/link';
import Image from 'next/image';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import {useRouter} from 'next/router';

export default function EmailSettingPage() {
  const router = useRouter();
  const redirectUrl = router.query?.['email-set-redirect']?.toString();
  const methods = useSignForm();
  const {
    handleSubmit,
    formState: {isSubmitting, errors: formErrors},
  } = methods;

  const update = trpc.user.emailSetting.useMutation({
    onSuccess: (data) => {
      const timeStamp = Date.now();
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  const onSubmit = async (formValue: Input) => {
    try {
      await update.mutateAsync({
        email: formValue.email,
      });

      router.push(`${router.basePath}${redirectUrl}`);
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };
  return (
    <div style={{overflow: 'hidden', position: 'relative'}}>
      {/* <Header /> */}
      <Link component={NextLink} href="/" color="inherit" aria-label="go to homepage" sx={{lineHeight: 0}}>
        <Image
          unoptimized
          src="/assets/logo-main/logo.svg"
          height="64"
          width={300}
          alt="App Logo"
          style={{height: '60px', marginTop: '60px', marginBottom: '20px', cursor: 'pointer', display: 'flex', width: '100%', alignItems: 'center'}}
        />
      </Link>
      <div
        style={{
          marginTop: '6rem',
          marginLeft: '3rem',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        メールアドレスを登録してください。
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          name="email"
          variant="outlined"
          placeholder="yama-ikitai@example.com"
          sx={{width: '100%', marginBottom: '1.5rem', marginTop: '1rem', padding: '0 40px'}}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: 'calc(100% - 80px)',
            height: '48px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            margin: '0 40px',
            borderRadius: '4px',
            background: '#205676',
            '&:hover': {
              boxShadow: 'none',
              background: '#205676',
            },
            '&:active': {
              boxShadow: 'none',
              background: darken('#205676', 0.2),
            },
          }}
        >
          登 録
        </Button>
      </FormProvider>
    </div>
  );
}

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

const baseSchema = z.object({
  email: z.string(),
});

function GetSchema(excludeId?: string) {
  const utils = trpc.useUtils();
  const f = utils.user.checkExistEmail.fetch;
  const schema = baseSchema.refine(
    async (data) => {
      const response = await f({email: data.email});
      return !response?.id;
    },
    {
      message: 'すでに登録されています',
      path: ['email'],
    }
  );
  return schema;
}

type Input = z.infer<typeof baseSchema>;
