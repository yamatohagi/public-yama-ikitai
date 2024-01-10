/* eslint-disable import/no-named-as-default */
import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';

import {Prisma} from '@prisma/client';
import TrailheadFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/TrailheadFindFirstArgsSchema';

export const MtTrailheadDetailGet = () => {
  const router = useRouter();
  const mtId = Number(router.query.id);

  const query: (typeof TrailheadFindFirstArgsSchema)['_input'] = {
    where: {id: mtId},
    include: {
      Parking: true,
      TrailheadToPhoto: {
        include: {
          Photo: true,
        },
      },
    },
  };

  const {data: trailhead, refetch} = trpc.trailhead.findFirst.useQuery<any, TrailheadGetReturnType>(query, {
    enabled: !!mtId,
  });

  return {trailhead, id: mtId, refetch};
};
export type TrailheadGetReturnType = Prisma.TrailheadGetPayload<{
  include: {
    Parking: true;
    TrailheadToPhoto: {
      include: {
        Photo: true;
      };
    };
  };
}>;
