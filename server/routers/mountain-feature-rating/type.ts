import { Context } from 'prisma/context';
import { UpdateRatingSchema } from './schemas/MountainFeatureRatingSchema';

export type SaveMtFeatureRatingHistoryProps = {
  input: (typeof UpdateRatingSchema)['_type'];
  ctx: Context;
};

export type GetMtFeatureRatingHistoryAverageResult = {
  _avg: {
    rating: number | null;
  };
};

export type UpdateMtFeatureProps = {
  input: (typeof UpdateRatingSchema)['_type'];
  ctx: Context;
  ratingAverage: number;
};
