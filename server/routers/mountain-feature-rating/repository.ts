import {SaveMtFeatureRatingHistoryProps, UpdateMtFeatureProps} from './type';

export const saveMtFeatureRatingHistory = async ({input, ctx}: SaveMtFeatureRatingHistoryProps) => {
  const result = await ctx.prisma.mountainFeatureRatingHistory.create({
    data: {
      mountainFeatureId: input.mountainFeatureId,
      featureName: input.featureName,
      rating: input.rating,
      userId: input.userId,
    },
  });
  console.log('input', result);
  return result;
};

export const getMtFeatureRatingHistoryAverage = async ({input, ctx}: SaveMtFeatureRatingHistoryProps) => {
  const result = await ctx.prisma.mountainFeatureRatingHistory.aggregate({
    where: {featureName: input.featureName, mountainFeatureId: input.mountainFeatureId},
    _avg: {rating: true},
  });
  return result;
};

export const updateMtFeatureRating = async ({input, ctx, ratingAverage}: UpdateMtFeatureProps) => {
  // todo:any外す
  const ratingName: any = {
    雲海: 'seaOfCloudsRating',
    天の川: 'starrySkyRating',
    雷鳥: 'ptarmiganRating',
    ご来光: 'sunriseRating',
    夕日: 'sunsetRating',
    山頂の広さ: 'widthPeakRating',
    登山道の展望: 'trailViewRating',
  };
  await ctx.prisma.mountainFeature.update({
    where: {id: input.mountainFeatureId},
    data: {[ratingName[input.featureName] as any]: ratingAverage},
  });
};
