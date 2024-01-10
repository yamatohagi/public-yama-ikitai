import {Prisma} from '@prisma/client';

const query = {
  include: {
    Trailhead: {
      include: {TrailheadRating: true, Parking: true},
    },
  },
  orderBy: {Trailhead: {intensity: 'desc'}},
};

//* データ取得 *//
export type MtTrailheadType = Prisma.MountainToTrailheadGetPayload<typeof query>;
