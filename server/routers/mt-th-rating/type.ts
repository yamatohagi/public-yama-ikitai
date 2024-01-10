import { Context } from 'prisma/context';
import { UpdateRatingSchema } from './schemas/MtThRatingSchema';

export type SaveMtThRatingHistoryProps = {
  input: (typeof UpdateRatingSchema)['_type'];
  ctx: Context;
};

export type GetMtThRatingHistoryAverageResult = {
  _avg: {
    rating: number | null;
  };
};

export type UpdateMtThProps = {
  input: (typeof UpdateRatingSchema)['_type'];
  ctx: Context;
  ratingAverage: number;
};
