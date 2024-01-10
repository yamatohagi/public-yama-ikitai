import {Context} from 'prisma/context';
import {NMountainFindManySchema} from 'server/schemas/findManyMountain.schema';
import MountainFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainFindFirstArgsSchema';

export type MountainFindManyProps = {
  input: (typeof NMountainFindManySchema)['_type'];
  ctx: Context;
};

export type MountainFinFirstProps = {
  input: (typeof MountainFindFirstArgsSchema)['_type'];
  ctx: Context;
};

// todo:createの時に緯度軽度が同じだと二行とれてしまう
export const MountainsGetSql = (whereClause: any, orderClause: string, countOnly = false) => {
  if (countOnly) {
    return `
      SELECT COUNT(DISTINCT "Mountain"."id")
      FROM "Mountain"
      LEFT JOIN "MountainToPhoto" ON "Mountain"."id" =  "MountainToPhoto"."mountainId"
      LEFT JOIN "Photo" ON "MountainToPhoto"."photoId"  =  "Photo"."id"
      LEFT JOIN (
          SELECT "MountainToTrailhead"."mountainId", MIN("MountainToTrailhead"."uphillTime") as min_uphillTime
          FROM "MountainToTrailhead"
          GROUP BY "MountainToTrailhead"."mountainId"
      ) AS min_uphill_trailhead ON "Mountain"."id" =  min_uphill_trailhead."mountainId"
      LEFT JOIN "MountainToTrailhead" ON "Mountain"."id" = "MountainToTrailhead"."mountainId" AND "MountainToTrailhead"."uphillTime" = min_uphill_trailhead.min_uphillTime
      LEFT JOIN "Trailhead" ON "Trailhead"."id" = "MountainToTrailhead"."trailheadId"



      WHERE "Mountain"."approvalAt" IS NOT NULL
      ${whereClause}`;
  }
  return `
    SELECT DISTINCT ON ("Mountain"."id", "Mountain"."elevation", distance, "MountainToTrailhead"."uphillTime")
      "Mountain"."id" AS "Mountain_id",

    ( 6371 * acos( cos( radians($1) ) * cos( radians( "Trailhead".lat ) ) * cos( radians( "Trailhead".lng ) - radians($2) ) + sin( radians($1) ) * sin(radians("Trailhead".lat)) ) ) AS distance
    FROM "Mountain"
    LEFT JOIN "MountainToPhoto" ON "Mountain"."id" =  "MountainToPhoto"."mountainId"
    LEFT JOIN "Photo" ON "MountainToPhoto"."photoId"  =  "Photo"."id"
    LEFT JOIN (
        SELECT "MountainToTrailhead"."mountainId", MIN("MountainToTrailhead"."uphillTime") as min_uphillTime
        FROM "MountainToTrailhead"
        GROUP BY "MountainToTrailhead"."mountainId"
    ) AS min_uphill_trailhead ON "Mountain"."id" =  min_uphill_trailhead."mountainId"
    LEFT JOIN "MountainToTrailhead" ON "Mountain"."id" = "MountainToTrailhead"."mountainId" AND "MountainToTrailhead"."uphillTime" = min_uphill_trailhead.min_uphillTime
    LEFT JOIN "Trailhead" ON "Trailhead"."id" = "MountainToTrailhead"."trailheadId"



    WHERE "Mountain"."approvalAt" IS NOT NULL
    ${whereClause}
    ${orderClause}
    LIMIT $3 OFFSET $4
    `;
};
