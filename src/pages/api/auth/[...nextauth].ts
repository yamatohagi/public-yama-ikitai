import {NextApiRequest, NextApiResponse} from 'next';
import NextAuth from 'next-auth';

import {authOptions} from 'server/auth';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // urlにsignupが含まれてるか
  const isSignUp = req.headers.referer?.includes('auth/signup');
  const {referer} = req.headers;

  // 'auth/signup'がリファラーに含まれる場合にクッキーを設定
  if (referer?.includes('auth/signup')) {
    const cookieValue = `signup_flag=true; Path=/; HttpOnly`;
    res.setHeader('Set-Cookie', cookieValue);
  }

  // 'auth/signin'がリファラーに含まれる場合にクッキーを削除
  if (referer?.includes('auth/signin')) {
    const cookieValue = `signup_flag=; Path=/; HttpOnly; Expires=${new Date(0).toUTCString()}`;
    res.setHeader('Set-Cookie', cookieValue);
  }

  return NextAuth(req, res, authOptions(req, res, isSignUp));
};
