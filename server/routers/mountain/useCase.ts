import {calculateDistance} from 'server/functions/etc';
import {getMountain, getMountainList} from './repository';
import {MountainFinFirstProps, MountainFindManyProps} from './type';

export const mountainFindManyUseCase = async ({input, ctx}: MountainFindManyProps) => {
  const {mountains: mountainList, count, nextCursor} = await getMountainList({input, ctx});

  const result = await ctx.prisma.mountain.findMany({
    select: {
      id: true,
      name: true,
      appealPoint: true,
      Area: {
        select: {name: true},
      },
      hyakumeizanStatus: true,
      nihyakumeizanStatus: true,
      elevation: true,
      prefecture: true,
      stay0n1d: true,
      stay1n2d: true,
      stay2n3d: true,
      stay3n4d: true,
      stay4n5d: true,
      stay5n6d: true,
      stay6n7d: true,
      MountainToTrailhead: {
        take: 1,
        orderBy: {uphillDistance: 'asc'},
        select: {
          Trailhead: {
            select: {
              name: true,
              lat: true,
              lng: true,
            },
          },
          uphillDistance: true,
          uphillTime: true,
        },
      },
      MountainToPhoto: {
        select: {
          Photo: {
            select: {
              id: true,
              thumbnail: true,
            },
          },
        },
      },
    },
    where: {
      id: {
        in: mountainList.map((m) => m.Mountain_id),
      },
    },
  });

  const mountains = result.map((mt) => {
    const {MountainToPhoto, MountainToTrailhead, ...rest} = mt;

    const getTravelDistance = () => {
      // 四つのうちどれか一つでもない場合はnullを返す
      if (!input.from.lat || !input.from.lng || !MountainToTrailhead[0].Trailhead.lat || !MountainToTrailhead[0].Trailhead.lng) {
        return null;
      }
      return calculateDistance(input.from.lat, input.from.lng, MountainToTrailhead[0].Trailhead.lat, MountainToTrailhead[0].Trailhead.lng);
    };
    const travelDistance = getTravelDistance(); // km
    const speed = 50; // km/h なんか絞り込みとズレる

    console.log(travelDistance ? travelDistance / speed : null);
    return {
      ...rest,
      uphillDistance: MountainToTrailhead[0].uphillDistance,
      uphillTime: MountainToTrailhead[0].uphillTime,
      travelDistance,
      travelTime: travelDistance ? Math.round((travelDistance / speed) * 60) : null,
      Photo: MountainToPhoto.map((p) => p.Photo),
    };
  });

  return {
    // 順番をidsに合わせる
    result: mountains.sort((a, b) => mountainList.findIndex((m) => m.Mountain_id === a.id) - mountainList.findIndex((m) => m.Mountain_id === b.id)),
    count,
    nextCursor: nextCursor < count ? nextCursor : null,
  };
};

export const mountainFindFirstUseCase = async ({input, ctx}: MountainFinFirstProps) => {
  const mt = await getMountain({input, ctx});

  return mt;
};
