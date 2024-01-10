import {protectedProcedure, publicProcedure, t} from 'server/trpc';
import MountainUrlMemoDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainUrlMemoDeleteManyArgsSchema';
import MountainUrlMemoFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainUrlMemoFindManyArgsSchema';
import {MtUrlMemoEditSchema} from './schemas/findManyMtFacilityPhotoSchema';

export const mountainurlmemosRouter = t.router({
  update: protectedProcedure.input(MtUrlMemoEditSchema).mutation(async ({ctx, input}) => {
    const {MtUrlMemo} = input.data;
    // 既存のデータを削除
    const deleteManyMountainUrlMemo = await ctx.prisma.mountainUrlMemo.deleteMany({
      where: {
        mountainId: input.mtId,
      },
    });

    const createOneMountainUrlMemo = await ctx.prisma.mountainUrlMemo.createMany({
      data:
        MtUrlMemo?.map((v) => {
          return {
            name: v.name,
            url: v.url,
            mountainId: input.mtId,
          };
        }) ?? [],
    });
    return createOneMountainUrlMemo;
  }),
  deleteMany: protectedProcedure.input(MountainUrlMemoDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyMountainUrlMemo = await ctx.prisma.mountainUrlMemo.deleteMany(input);
    return deleteManyMountainUrlMemo;
  }),

  findMany: publicProcedure.input(MountainUrlMemoFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyMountainUrlMemo = await ctx.prisma.mountainUrlMemo.findMany(input);
    return findManyMountainUrlMemo;
  }),
});

// include: MountainUrlMemoIncludeSchema.optional(),に関連したファイル使うとエラー出る
// ReferenceError: Cannot access 'I' before initialization
