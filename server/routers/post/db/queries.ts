export const PhotoGetHashtagOnlySql = (hashtagIds: number[], mountainId: number | undefined, countOnly = false) => {
  const placeholders = hashtagIds.map((_, index) => `$${index + 1}`).join(', ');
  // LEFT JOINだとtextのみでphotoがない場合に取得できない nullになっちゃうから消してる
  if (countOnly) {
    return `
      SELECT
        COUNT(DISTINCT "Photo"."id") AS "count"
      FROM "PostToHashtag"
      INNER JOIN "Post" ON "PostToHashtag"."postId" = "Post"."id"
      INNER JOIN "Photo" ON "Post"."id" = "Photo"."postId"
      WHERE "PostToHashtag"."hashtagId" IN (${placeholders})
      ${mountainId ? `AND "Post"."mtId" = ${mountainId}` : ''}
      HAVING COUNT(DISTINCT "PostToHashtag"."hashtagId") = ${hashtagIds.length} -- ここでハッシュタグの数を指定
      `;
  }

  return `
    SELECT
      "Photo"."postId" AS "Photo_postId",
      "Photo"."id" AS "Photo_id",
      "Photo"."type" AS "Photo_type",
      "Photo"."original" AS "Photo_original",
      "Photo"."thumbnail" AS "Photo_thumbnail",
      "Photo"."width" AS "Photo_width",
      "Photo"."height" AS "Photo_height",
      "Photo"."uploadStatus" AS "Photo_upload_status",
      COUNT(DISTINCT "PostToHashtag"."hashtagId") AS "tag_count"
    FROM "PostToHashtag"
    INNER JOIN "Post" ON "PostToHashtag"."postId" = "Post"."id"
    INNER JOIN "Photo" ON "Post"."id" = "Photo"."postId"
    WHERE "PostToHashtag"."hashtagId" IN (${placeholders})
    ${mountainId ? `AND "Post"."mtId" = ${mountainId}` : ''}
    GROUP BY "Photo"."id"
    HAVING COUNT(DISTINCT "PostToHashtag"."hashtagId") = ${hashtagIds.length} -- ここでハッシュタグの数を指定
    LIMIT $${hashtagIds.length + 1} OFFSET $${hashtagIds.length + 2}
    `;
  // zodでnumberしてくれるからbindする必要ない
};

export const PhotoGetSql = (oWhereClause: any, orderClause: string, photoExists: boolean, countOnly = false) => {
  const baseJoins = `
    LEFT JOIN "User" ON "Post"."userId" = "User"."id"
    LEFT JOIN "Mountain" ON "Post"."mtId" = "Mountain"."id"
    LEFT JOIN (
        SELECT "MountainToTrailhead"."mountainId", MIN("MountainToTrailhead"."uphillTime") as min_uphillTime
        FROM "MountainToTrailhead"
        GROUP BY "MountainToTrailhead"."mountainId"
    ) AS min_uphill_trailhead ON "Mountain"."id" = min_uphill_trailhead."mountainId"
    LEFT JOIN "MountainToTrailhead" ON "Mountain"."id" = "MountainToTrailhead"."mountainId" AND "MountainToTrailhead"."uphillTime" = min_uphill_trailhead.min_uphillTime
    LEFT JOIN (
      SELECT "postId", COUNT("id") AS "like_count"
      FROM "PostLike"
      GROUP BY "postId"
    ) AS "like_data" ON "Post"."id" = "like_data"."postId"
  `;

  const photoExistsClause = photoExists
    ? `AND EXISTS (
      SELECT 1
      FROM "Photo"
      WHERE "Photo"."postId" = "Post"."id"
    )`
    : '';

  const whereClause = oWhereClause.length > 0 ? `${oWhereClause} ${photoExistsClause}` : `WHERE 1=1 ${photoExistsClause}`;

  if (countOnly) {
    return `
      SELECT COUNT(DISTINCT "Post"."id") AS "count"
      FROM "Post"
      ${baseJoins}
      ${whereClause}
      AND "Post"."parentId" IS NULL
    `;
  }

  return `
    SELECT
      "Post"."id" AS "Post_id",
      "Post"."content" AS "Post_content",
      "Post"."createdAt" AS "Post_createdAt",
      "Post"."updatedAt" AS "Post_updatedAt",
      "Post"."deletedAt" AS "Post_deletedAt",
      "Post"."mtFacilityId" AS "Post_mtFacilityId",
      "Post"."userId" AS "Post_userId",
      "Post"."parentId" AS "Post_parentId",
      "Post"."activityDate" AS "Post_activityDate",
      "Post"."mtId" AS "Post_mtId",
      "Post"."mtTrailheadId" AS "Post_mtTrailheadId",
      "User"."id" AS "User_id",
      "User"."name" AS "User_name",
      "User"."userName" AS "User_userName",
      "User"."iconThumbnail" AS "User_iconThumbnail",
      "User"."iconOriginal" AS "User_iconOriginal",
      "User"."createdAt" AS "User_createdAt",
      "User"."updatedAt" AS "User_updatedAt",
      "User"."deletedAt" AS "User_deletedAt",
      "User"."email" AS "User_email",
      "User"."password" AS "User_password",
      "User"."image" AS "User_image",
    COALESCE("like_data"."like_count", 0) AS "like_count"
    FROM "Post"
    ${baseJoins}

    ${whereClause}
    AND "Post"."parentId" IS NULL
    ${orderClause}
    LIMIT $1 OFFSET $2
  `;
};
