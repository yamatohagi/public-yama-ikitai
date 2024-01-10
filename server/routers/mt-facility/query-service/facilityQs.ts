import {Context} from 'prisma/context';

export function getMtf(ctx: Context, ids: number[]) {
  const mtf = ctx.prisma.mtFacility.findMany({
    where: {
      id: {in: ids},
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      lat: true,
      lng: true,
      postalCode: true,
      prefecture: true,
      address1: true,
      address2: true,
      address3: true,
      areaId: true,
      name: true,
      nameKana: true,
      remark: true,
      docomo: true,
      au: true,
      softbank: true,
      rakuten: true,
      inTFlag: true,
      inTCleanRating: true,
      inTRemark: true,
      outTFlag: true,
      outTCleanRating: true,
      outTRemark: true,
      bathSinkFlag: true,
      bathSinkCleanRating: true,
      bathSinkRemark: true,
      talkRoomFlag: true,
      talkRoomCleanRating: true,
      talkRoomRemark: true,
      dryRoomFlag: true,
      dryRoomCleanRating: true,
      dryRoomRemark: true,
      cafeSpaceRoomFlag: true,
      cafeSpaceRoomCleanRating: true,
      cafeSpaceRoomRemark: true,
      bashRoomFlag: true,
      bashRoomCleanRating: true,
      bashRoomRemark: true,
      listCapacityTent: true,
      listCapacityHut: true,
      listFeeTent: true,
      listFeeHut: true,
      listFeeHut2: true,
      listTelOffice: true,
      listTelLocal: true,
      listHp: true,
      listElevation: true,
      tStay: true,
      tCafeSpace: true,
      tTent: true,
      tShop: true,
      tToilet: true,
      tBathSink: true,
      tChangingRoom: true,
      tDryRoom: true,
      tBath: true,
      tWave: true,
      tWifi: true,
      tPublicPhone: true,
      tKitchen: true,
      tTalkRoom: true,
      tOther: true,
      Area: {
        select: {
          id: true,
          name: true,
        },
      },
      MtFacilityType: {
        select: {
          id: true,
          name: true,
        },
      },
      MtFacilityToPhoto: {
        take: 1,
        orderBy: {id: 'asc'},
        select: {
          Photo: {
            select: {
              id: true,
              postId: true,
              thumbnail: true,
              original: true,
            },
          },
        },
      },
      MountainToMtFacility: {
        select: {
          Mountain: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return mtf;
}

export type MtFacilityGetQueryRawType = {MtFacility_id: number};
export const MtFacilityGetManySql = (oWhereClause: any, orderClause: string, countOnly = false) => {
  //      GROUP BY "MtFacility"."id", "Area"."id"コレいらないらしい
  if (countOnly) {
    return `
      SELECT
        COUNT(DISTINCT "MtFacility"."id") AS "count"
      FROM "MtFacility"
      ${oWhereClause}
      `;
  }

  return `
    SELECT
      "MtFacility"."id" AS "MtFacility_id",
     ( 6371 * acos( cos( radians($1) ) * cos( radians( "MtFacility".lat ) ) * cos( radians( "MtFacility".lng ) - radians($2) ) + sin( radians($1) ) * sin(radians("MtFacility".lat)) ) ) AS distance
    FROM "MtFacility"
    ${oWhereClause}
    ${orderClause}
    LIMIT $${3} OFFSET $${4}
    `;
};
