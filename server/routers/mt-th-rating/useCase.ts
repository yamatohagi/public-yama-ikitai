import {getMtThRatingHistoryAverage, saveMtThRatingHistory, updateMtThRating} from './repository';
import {SaveMtThRatingHistoryProps} from './type';

export const mtThRatingPostUseCase = async ({input, ctx}: SaveMtThRatingHistoryProps) => {
  await ctx.prisma.$transaction(async (prisma) => {
    // まずMtThRatingHistoryにそのまま保存
    const mtThRatingHistory = await saveMtThRatingHistory({input, ctx});
    // mtThRatingHistoryがなかったらエラー
    if (!mtThRatingHistory) throw new Error('mtThRatingHistoryがありません');

    // その後、MtThRatingHistoryの平均値を取得
    const mtThRatingHistoryAverage = await getMtThRatingHistoryAverage({
      input,
      ctx,
    });

    // 平均値をMtThに保存
    await updateMtThRating({
      input,
      ctx,
      ratingAverage: mtThRatingHistoryAverage._avg.rating || 0,
    });
  });
};
