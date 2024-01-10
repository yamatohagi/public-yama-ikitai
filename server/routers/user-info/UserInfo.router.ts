import {protectedProcedure, t} from 'server/trpc';
import {toN} from 'server/functions/toN';
import {UserInfoUpdateArgsSchema} from './schemas/UserInfoUpdateArgsSchema';

export const userInfosRouter = t.router({
  findOne: protectedProcedure.query(async ({ctx, input}) => {
    // userId取ってくる
    const userId = ctx.session?.user.id;
    if (!userId) throw new Error('userId is not found');

    const findFirstUser = await ctx.prisma.userInfo.findFirst({
      where: {userId},
      select: {
        id: true,
        userId: true,
        startPointLat: true,
        startPointLng: true,
        startPointLabel: true,
        dayMoveMaxTime: true,
        stayStartTime: true,
        startDayOfWeek: true,
        coordinatesRadius: true,
      },
    });
    return findFirstUser;
  }),

  updateOne: protectedProcedure.input(UserInfoUpdateArgsSchema).mutation(async ({ctx, input}) => {
    // userId取ってくる
    const userId = ctx.session?.user.id;
    if (!userId) throw new Error('userId is not found');

    await ctx.prisma.$transaction(async (prisma) => {
      // あればまず削除
      await prisma.userInfo.deleteMany({where: {userId}});

      // 作成
      await prisma.userInfo.create({
        data: {
          startPointLat: toN(input.data.startPointLat),
          startPointLng: toN(input.data.startPointLng),
          startPointLabel: input.data.startPointLabel,
          dayMoveMaxTime: toN(input.data.dayMoveMaxTime),
          stayStartTime: input.data.stayStartTime,
          startDayOfWeek: toN(input.data.startDayOfWeek),
          coordinatesRadius: toN(input.data.coordinatesRadius),

          User: {connect: {id: userId}},
        },
      });
    });
    return 'result';
  }),
});
