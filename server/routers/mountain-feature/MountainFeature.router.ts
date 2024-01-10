import {z} from 'zod';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';
import {UpdateFeatureItemSchema} from './schemas/UpdateSpecificItemSchema';

export const mountainFeatureRouter = t.router({
  updateFeatureItem: protectedProcedure.input(UpdateFeatureItemSchema).mutation(async ({ctx, input}) => {
    const updateManyMtFacility = await ctx.prisma.mountainFeature.updateMany({
      data: {
        [input.remark.columnName]: input.remark.value,
      },
      where: {
        mountainId: input.mtId,
      },
    });
    return updateManyMtFacility;
  }),
  findFirst: publicProcedure
    .input(
      z.object({
        mtId: z.number(),
        pick: z.array(
          z.enum([
            'seaOfCloudsRating',
            'starrySkyRating',
            'ptarmiganRating',
            'sunriseRating',
            'sunsetRating',
            'widthPeakRating',
            'trailViewRating',
            'seaOfCloudsRemark',
            'starrySkyRemark',
            'sunriseRemark',
            'sunsetRemark',
            'widthPeakRemark',
            'trailViewRemark',
            'ptarmiganRemark',
          ])
        ),
      })
    )
    .query(async ({ctx, input}) => {
      const findFirstMountainToMtFacility = await ctx.prisma.mountainFeature.findFirst({
        where: {
          mountainId: input.mtId,
        },
        select: {
          seaOfCloudsRating: true,
          starrySkyRating: true,
          ptarmiganRating: true,
          sunriseRating: true,
          sunsetRating: true,
          widthPeakRating: true,
          trailViewRating: true,
          seaOfCloudsRemark: true,
          starrySkyRemark: true,
          sunriseRemark: true,
          sunsetRemark: true,
          widthPeakRemark: true,
          trailViewRemark: true,
          ptarmiganRemark: true,
        },
      });
      if (!findFirstMountainToMtFacility) {
        throw new Error('findFirstMountainToMtFacility is null');
      }
      // プロパティを制限する

      type PickKeys = (typeof input.pick)[number];
      const result: Partial<Record<PickKeys, (typeof findFirstMountainToMtFacility)[PickKeys]>> = {};

      input.pick.forEach((key) => {
        if (key in findFirstMountainToMtFacility) {
          result[key] = findFirstMountainToMtFacility[key];
        }
      });

      return findFirstMountainToMtFacility;
    }),
});
