import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import {paths} from 'src/routes/paths';
import {GetUserInfo} from './api';

type useAuthProps = {
  userInfo?: boolean;
};

export const useAuth = (props?: useAuthProps) => {
  const {userInfo} = props ?? {};
  const router = useRouter();
  const {data: session, status} = useSession();
  const userId = session?.user?.id;
  const user = session?.user;

  // infoがあるときはinfoGetする

  const {data} = GetUserInfo({userId, userInfo});

  // 関数を返さないと
  const loginCheck = () => {
    if (status === 'unauthenticated') {
      router.push(paths.login.path); // ここでログインページへのパスを指定します
      return undefined;
    }
    return userId;
  };

  return {userId, loginCheck, userInfo: data, user};
};
