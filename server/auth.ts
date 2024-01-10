import {getServerSession, type DefaultSession, type NextAuthOptions} from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import LineProvider from 'next-auth/providers/line';
import prisma from 'prisma/context';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
      hasEmail: boolean;
      emailVerificationEmailSent?: Date;
      unverifiedEmail?: string;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions = (req?: NextApiRequest, res?: NextApiResponse, hoge?: any): NextAuthOptions => ({
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({user, account, profile, email, credentials, ...test}) {
      const isSignUp = req?.headers.cookie?.includes('signup_flag=true');
      // next-auth.callback-url='hogehoge'って感じで入ってる
      const nextAuthCallBackUrl = req?.headers.cookie
        ?.split(';')
        .find((cookie) => cookie.includes('next-auth.callback-url'))
        ?.split('=')[1];

      // ユーザーがデータベースに存在するかチェック
      const isUserExisting = await prisma.user.findFirst({
        where: {
          email: {not: null, equals: user.email},
          emailVerified: {not: null},
        },
      });

      if (isUserExisting || isSignUp) {
        // 既存のユーザーであればサインインを許可
        return true;
      }
      // 新規ユーザーの場合は登録ページにリダイレクト
      return `/auth/signup?error=notSignedUp&next-auth-callback-url=${nextAuthCallBackUrl}`;
    },

    async session({session, user}) {
      // ユーザーがメールアドレスを持っているかチェック
      const hasEmail = !!user.email && user.emailVerified;

      const dbUser = await prisma.user.findUnique({
        where: {id: user.id},
        select: {
          emailVerificationEmailSent: true,
          unverifiedEmail: true,
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          hasEmail, // メールアドレスの有無をセッションに追加
          emailVerificationEmailSent: dbUser?.emailVerificationEmailSent,
          unverifiedEmail: dbUser?.unverifiedEmail,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      version: '2.0',
    } as ClientType),
    EmailProvider({
      server: `smtp://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`,
      from: process.env.EMAIL_FROM,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: '/auth/signin',
  },
});

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions());

type ClientType = {
  clientId: string;
  clientSecret: string;
};
