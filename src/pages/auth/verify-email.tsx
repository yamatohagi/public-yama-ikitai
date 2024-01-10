import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {trpc} from 'src/utils/trpc';

export default function VerifyEmailPage() {
  const router = useRouter();
  const update = trpc.user.verifyEmail.useMutation({
    onSuccess: (data) => {
      // ホーム画面に遷移
      router.push('/');
    },
    onError: (error) => {
      alert(`Error :${error?.toString()}`); // これエラーの時にどうするか考えておく(login画面に遷移するとか)
    },
  });

  const {token} = router.query;

  useEffect(() => {
    // トークンがある場合、メールアドレスの確認を行うAPIを呼び出す
    if (!token) return;
    update.mutateAsync({token: token as string});
  }, [token]);

  return (
    <div>
      <h1>メールアドレスの確認</h1>
      <p>メールアドレスの確認を行っています。少々お待ちください。</p>
    </div>
  );
}
