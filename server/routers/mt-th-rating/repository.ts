import {SaveMtThRatingHistoryProps, UpdateMtThProps} from './type';

export const saveMtThRatingHistory = async ({input, ctx}: SaveMtThRatingHistoryProps) => {
  const result = await ctx.prisma.trailheadRatingHistory.create({
    data: {
      trailheadId: input.trailheadId,
      featureType: input.featureType,
      rating: input.rating,
      userId: input.userId,
    },
  });
  return result;
};

export const getMtThRatingHistoryAverage = async ({input, ctx}: SaveMtThRatingHistoryProps) => {
  const result = await ctx.prisma.trailheadRatingHistory.aggregate({
    where: {
      trailheadId: input.trailheadId,
      featureType: input.featureType,
    },
    _avg: {rating: true},
  });
  return result;
};

export const updateMtThRating = async ({input, ctx, ratingAverage}: UpdateMtThProps) => {
  // いったん削除
  await ctx.prisma.trailheadRating.deleteMany({
    where: {
      trailheadId: input.trailheadId,
      featureType: input.featureType,
    },
  });

  await ctx.prisma.trailheadRating.create({
    data: {
      featureType: input.featureType,
      trailheadId: input.trailheadId,
      rating: ratingAverage,
    },
  });
};
