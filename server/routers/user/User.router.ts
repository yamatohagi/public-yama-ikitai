import {protectedProcedure, publicProcedure, t} from 'server/trpc';
import {z} from 'zod';
import {createTransport} from 'nodemailer';
import crypto from 'crypto';
import {use} from 'react';
import UserCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserCreateArgsSchema';
import UserDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserDeleteManyArgsSchema';
import UserFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserFindFirstArgsSchema';
import UserFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserFindManyArgsSchema';
import {UserUpdateArgsSchema} from './schemas/findManyUserSchema';

export const usersRouter = t.router({
  createOne: protectedProcedure.input(UserCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOneUser = await ctx.prisma.user.create(input);
    return createOneUser;
  }),
  deleteMany: protectedProcedure.input(UserDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyUser = await ctx.prisma.user.deleteMany(input);
    return deleteManyUser;
  }),
  findFirst: publicProcedure.input(UserFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstUser = await ctx.prisma.user.findFirst(input);
    return findFirstUser;
  }),

  findByEdit: publicProcedure.input(z.object({userId: z.string().cuid()})).query(async ({ctx, input}) => {
    const findFirstUser = await ctx.prisma.user.findFirst({
      where: {id: input.userId},
    });
    return findFirstUser;
  }),
  update: publicProcedure.input(UserUpdateArgsSchema).mutation(async ({ctx, input}) => {
    const {images} = input.data;
    const image = images?.[0];

    const findFirstUser = await ctx.prisma.user.update({
      where: {
        id: input.userId,
      },
      data: {
        name: input.data.name,
        userProfileText: input.data.userProfileText,
        userName: input.data.userName,

        image: image?.original,
      },
    });
    return findFirstUser;
  }),
  emailSetting: protectedProcedure.input(z.object({email: z.string().email()})).mutation(async ({ctx, input}) => {
    // SMTPサーバーの設定
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!, 10),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 一意の認証トークンを生成
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 3600000); // 1時間後に有効期限が切れる

    // トークンをデータベースに保存
    await ctx.prisma.emailVerificationToken.create({
      data: {
        token,
        userId: ctx.session!.user.id,
        expires: tokenExpiry,
      },
    });

    // 認証メールの送信
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: input.email,
      subject: 'メールアドレスの確認',
      html: `<p>以下のリンクをクリックしてメールアドレスを確認してください:</p><p><a href="${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}">${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    await ctx.prisma.user.update({
      where: {
        id: ctx.session?.user.id,
      },
      data: {
        unverifiedEmail: input.email,
        emailVerificationEmailSent: new Date(Date.now()),
      },
    });
    return 'true';
  }),
  findMany: publicProcedure.input(UserFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyUser = await ctx.prisma.user.findMany(input);
    return findManyUser;
  }),
  verifyEmail: publicProcedure.input(z.object({token: z.string()})).mutation(async ({ctx, input}) => {
    const userId = ctx.session?.user.id;
    const done = await ctx.prisma.emailVerificationToken.update({
      where: {userId, token: input.token},
      data: {
        expires: new Date(Date.now() - 1),
        User: {
          update: {
            email: ctx.session?.user.unverifiedEmail,
            unverifiedEmail: null,
            emailVerified: new Date(Date.now()),
            emailVerificationEmailSent: new Date(Date.now()),
          },
        },
      },
    });
    return done;
  }),

  checkAlready: publicProcedure.input(z.object({excludeId: z.string().optional().nullable(), userName: z.string()})).query(async ({ctx, input}) => {
    const alreadyMt = await ctx.prisma.user.findFirst({
      where: {userName: input.userName, ...(input.excludeId ? {id: {not: input.excludeId}} : {})},
    });
    return alreadyMt;
  }),
  checkExistEmail: publicProcedure.input(z.object({email: z.string()})).query(async ({ctx, input}) => {
    const alreadyMt = await ctx.prisma.user.findFirst({
      where: {
        email: {
          equals: input.email,
          not: null,
        },
        emailVerified: {
          not: null,
        },
      },
    });
    return alreadyMt;
  }),
});
