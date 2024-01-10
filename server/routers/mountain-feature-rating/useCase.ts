import {
  getMtFeatureRatingHistoryAverage,
  saveMtFeatureRatingHistory,
  updateMtFeatureRating,
} from './repository';
import { SaveMtFeatureRatingHistoryProps } from './type';

export const mtFeatureRatingPostUseCase = async ({
  input,
  ctx,
}: SaveMtFeatureRatingHistoryProps) => {
  // まずMountainFeatureRatingHistoryにそのまま保存
  const mtFeatureRatingHistory = await saveMtFeatureRatingHistory({ input, ctx });
  // mountainFeatureRatingHistoryがなかったらエラー
  if (!mtFeatureRatingHistory) throw new Error('mountainFeatureRatingHistoryがありません');

  // その後、MountainFeatureRatingHistoryの平均値を取得
  const mtFeatureRatingHistoryAverage = await getMtFeatureRatingHistoryAverage({
    input,
    ctx,
  });

  // 平均値をMountainFeatureに保存
  await updateMtFeatureRating({
    input,
    ctx,
    ratingAverage: mtFeatureRatingHistoryAverage._avg.rating || 0,
  });
};
