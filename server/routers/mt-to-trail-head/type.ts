import {Prisma} from '@prisma/client';

// Prismaで生成されたMountain型を使用
// Prismaで生成された型を使用

type Trailhead = Prisma.TrailheadGetPayload<{}>;
type Area = Prisma.AreaGetPayload<{}>;
type Mountain = Prisma.MountainGetPayload<{select: {id: true; name: true}}>;

// 生成した型を基に新しい型を作成

type TrailheadKeys = {
  [P in keyof Trailhead as `Trailhead_${P}`]: Trailhead[P];
};

type AreaKeys = {
  [P in keyof Area as `Area_${P}`]: Area[P];
};

type MountainArrayKeys = {
  [P in keyof Mountain as `Mountain_${P}s`]: Array<Mountain[P]>;
};

export type TrailheadGetQueryRawType = TrailheadKeys & AreaKeys & MountainArrayKeys;

export type PhotoGetQueryRawType = TrailheadKeys;

export const TrailheadsGetSql = (oWhereClause: any, hashtagIds: number[], orderClause: string, countOnly = false) => {
  // const placeholders = hashtagIds.map((_, index) => `$${index + 1}`).join(', ');

  // let whereClause = '';
  // let havingClause = '';

  // if (hashtagIds.length > 0) {
  //   whereClause = `WHERE "PostToHashtag"."hashtagId" IN (${placeholders})`;
  //   havingClause = `HAVING COUNT(DISTINCT "PostToHashtag"."hashtagId") = ${hashtagIds.length} -- ここでハッシュタグの数を指定`;
  // }
  if (countOnly) {
    return `
      SELECT
        COUNT(DISTINCT "Trailhead"."id") AS "count"
      FROM "Trailhead"
      LEFT JOIN "Area" ON "Trailhead"."areaId" = "Area"."id"
      ${oWhereClause}
      `;
  }

  return `
    SELECT
      "Trailhead"."id" AS "Trailhead_id",
      "Trailhead"."createdAt" AS "Trailhead_createdAt",
      "Trailhead"."updatedAt" AS "Trailhead_updatedAt",
      "Trailhead"."deletedAt" AS "Trailhead_deletedAt",
      "Trailhead"."areaId" AS "Trailhead_areaId",
      "Trailhead"."name" AS "Trailhead_name",
      "Trailhead"."nameKana" AS "Trailhead_nameKana",
      "Trailhead"."intro" AS "Trailhead_intro",
      "Trailhead"."postalCode" AS "Trailhead_postalCode",
      "Trailhead"."prefecture" AS "Trailhead_prefecture",
      "Trailhead"."address1" AS "Trailhead_address1",
      "Trailhead"."address2" AS "Trailhead_address2",
      "Trailhead"."address3" AS "Trailhead_address3",
      "Trailhead"."lat" AS "Trailhead_lat",
      "Trailhead"."lng" AS "Trailhead_lng",
      "Trailhead"."lastConbiniName" AS "Trailhead_lastConbiniName",
      "Trailhead"."lastConbiniNameKana" AS "Trailhead_lastConbiniNameKana",
      "Trailhead"."lastConbiniLat" AS "Trailhead_lastConbiniLat",
      "Trailhead"."lastConbiniLng" AS "Trailhead_lastConbiniLng",
      "Trailhead"."popularRating" AS "Trailhead_popularRating",
      "Trailhead"."hpRating" AS "Trailhead_hpRating",
      "Trailhead"."myCarReg" AS "Trailhead_myCarReg",
      "Trailhead"."intensity" AS "Trailhead_intensity",
      "Trailhead"."view" AS "Trailhead_view",
      "Trailhead"."toilet" AS "Trailhead_toilet",
      "Trailhead"."vendingMachine" AS "Trailhead_vendingMachine",
      "Trailhead"."store" AS "Trailhead_store",
      "Trailhead"."remark" AS "Trailhead_remark",
      "Area"."id" AS "Area_id",
      "Area"."name" AS "Area_name",
       ARRAY_AGG("Mountain"."id") AS "Mountain_ids",
       ARRAY_AGG("Mountain"."name") AS "Mountain_names",
     ( 6371 * acos( cos( radians($1) ) * cos( radians( "Trailhead".lat ) ) * cos( radians( "Trailhead".lng ) - radians($2) ) + sin( radians($1) ) * sin(radians("Trailhead".lat)) ) ) AS distance
    FROM "Trailhead"
    LEFT JOIN "Area" ON "Trailhead"."areaId" = "Area"."id"
    LEFT JOIN "MountainToTrailhead" ON "Trailhead"."id" = "MountainToTrailhead"."trailheadId"
    LEFT JOIN "Mountain" ON "MountainToTrailhead"."mountainId" = "Mountain"."id"
    ${oWhereClause}
    GROUP BY "Trailhead"."id", "Area"."id"
    ${orderClause}
    LIMIT $${hashtagIds.length + 1} OFFSET $${hashtagIds.length + 2}
    `;
};
