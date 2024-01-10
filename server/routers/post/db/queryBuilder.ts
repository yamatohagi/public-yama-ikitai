import {Prisma} from '@prisma/client';
import {findManyWithPhotoSchema} from '../schemas/findManyWithPhotoSchema';
import {findManyMtDetailPhotoSchema} from '../schemas/findManyMtDetailPhotoSchema';

type FilterHandlers = {
  [K in any]: (
    // ここFilterKey
    data: string[],
    input: (typeof findManyWithPhotoSchema)['_type'],
    index: number
  ) => any;
};

const filterHandlers: FilterHandlers = {
  uphillTimeMax(data, _, index) {
    if (data && data.length > 0) {
      return [`"MountainToTrailhead"."uphillTime" <= $${index}`, Number(data[0])];
    }
    return null;
  },
  uphillTimeMin(data, _, index) {
    if (data && data.length > 0) {
      return [`"MountainToTrailhead"."uphillTime" >= $${index}`, Number(data[0])];
    }
    return null;
  },
  mtPeakMax(data, _, index) {
    if (data && data.length > 0) {
      console.log(' Number(data[0])', data);
      return [`"Mountain"."elevation" <= $${index}`, Number(data[0])];
    }
    return null;
  },
  mtPeakMin(data, _, index) {
    if (data && data.length > 0) {
      return [`"Mountain"."elevation" >= $${index}`, Number(data[0])];
    }
    return null;
  },
  SearchButtonWithInput(data, input, index) {
    const searchValue = input.searchFilter?.SearchButtonWithInput?.value;
    if (searchValue) {
      return [
        `
        "Post"."id" IN (
            SELECT "postId"
            FROM "Mountain"
            WHERE "Mountain"."name" LIKE $${index}
        )
        OR "Post"."id" IN (
            SELECT "PostToHashtag"."postId"
            FROM "PostToHashtag"
            JOIN "Hashtag" ON "PostToHashtag"."hashtagId" = "Hashtag"."id"
            WHERE "Hashtag"."tag" LIKE $${index}
        )
        OR "Post"."content" LIKE $${index}
        `,
        `%${searchValue}%`,
      ];
    }
    return null;
  },
  mtArea(areaFilter, _, index) {
    if (areaFilter.length > 0) {
      const placeholders = areaFilter.map((_, idx) => `$${index + idx}`).join(', ');
      const sqlClause = `"Mountain"."areaId" IN (${placeholders})`;

      return [sqlClause, ...areaFilter.map((v) => Number(v))];
    }
    return [null, []];
  },
  area(areaFilter, _, index) {
    if (areaFilter.length > 0) {
      const placeholders = areaFilter.map((_, idx) => `$${index + idx}`).join(', ');
      const sqlClause = `"Mountain"."prefecture" IN (${placeholders})`;
      return [sqlClause, ...areaFilter];
    }
    return [null, []];
  },

  climbingTime(data, input, index) {
    const clauses = [];
    const bindValues = [];

    if (data.includes('lessThanTwo')) {
      clauses.push(`"MountainToTrailhead"."uphillTime" < $${index}`);
      bindValues.push(119);
      index++;
    }
    if (data.includes('twoToFour')) {
      clauses.push(`"MountainToTrailhead"."uphillTime" >= $${index} AND "MountainToTrailhead"."uphillTime" <= $${index + 1}`);
      bindValues.push(120, 239);
      index += 2;
    }
    if (data.includes('fourToSix')) {
      clauses.push(`"MountainToTrailhead"."uphillTime" >= $${index} AND "MountainToTrailhead"."uphillTime" <= $${index + 1}`);
      bindValues.push(240, 359);
      index += 2;
    }
    if (data.includes('sixToEight')) {
      clauses.push(`"MountainToTrailhead"."uphillTime" >= $${index} AND "MountainToTrailhead"."uphillTime" <= $${index + 1}`);
      bindValues.push(360, 479);
      index += 2;
    }
    if (data.includes('moreThanEight')) {
      clauses.push(`"MountainToTrailhead"."uphillTime" > $${index}`);
      bindValues.push(480);
      index++;
    }

    const sqlClause = clauses.length > 0 ? clauses.join(' OR ') : '';
    return [sqlClause, ...bindValues];
  },
  tent(data, _, index) {
    const clauses = [];
    const bindValues = [];

    if (data.includes('overHundred')) {
      clauses.push(`"Facility"."capacity" > $${index}`);
      bindValues.push(100);
      index++;
    }
    if (data.includes('limit3000')) {
      clauses.push(`"Facility"."cost" < $${index}`);
      bindValues.push(3000);
      index++;
    }

    const sqlClause = clauses.length > 0 ? clauses.join(' OR ') : '';
    return [sqlClause, ...bindValues];
  },
  includeHashTags(data, _, index) {
    if (data && data.length > 0) {
      const placeholders = data.map((tag, idx) => `$${index + idx}`).join(',');
      const subQuery = `
      SELECT DISTINCT "postId"
      FROM "PostToHashtag"
      INNER JOIN "Hashtag" ON "PostToHashtag"."hashtagId" = "Hashtag"."id"
      WHERE "Hashtag"."tag" IN (${placeholders})
    `;

      return [`"Post"."id" IN (${subQuery})`, ...data];
    }
    return null;
  },
};

export type Mountain = Prisma.MountainGetPayload<{include: {MountainToTrailhead: true}}>;

export function generateSQLWhereClause(input: (typeof findManyWithPhotoSchema)['_type'], index: number) {
  const {searchFilter} = input;
  const finalFilters: string[] = [];
  const bindValues: any[] = [];

  const uniqueKeys = searchFilter ? Object.keys(searchFilter) : [];

  let placeholderIndex = index; // lat, lngの分
  uniqueKeys.forEach((uniqueKey) => {
    const handler = filterHandlers[uniqueKey];
    if (handler) {
      const values = searchFilter?.[uniqueKey]?.value;

      if (!values) return;
      const processedValues = typeof values === 'number' || typeof values === 'string' ? [values] : [...values];

      const [sqlClause, ...handlerBindValues] = handler(processedValues, input, placeholderIndex);
      if (sqlClause) {
        if (sqlClause.includes(' OR ')) {
          finalFilters.push(`(${sqlClause})`);
        } else {
          finalFilters.push(sqlClause);
        }

        bindValues.push(...handlerBindValues);
        placeholderIndex += handlerBindValues.length; // プレースホルダのインデックスを更新
      }
    }
  });

  return [finalFilters.length ? `WHERE ${finalFilters.join(' AND ')}` : '', bindValues];
}

export function generateSQLOrderClause(input: (typeof findManyWithPhotoSchema)['_type']) {
  const {orderBy} = input;
  // memo:  SELECT DISTINCT ON ("Mountain"."id", "Mountain"."elevation", distance)に足してから以下に書く
  // if (orderBy === 'mtPeakDesc') {
  //   return 'ORDER BY "Mountain"."elevation" DESC';
  // }

  if (orderBy === 'likeDesc') {
    return 'ORDER BY "like_count" DESC';
  }

  // if (orderBy === 'mtUphillTimeDesc') {
  //   return 'ORDER BY "MountainToTrailhead"."uphillTime" DESC';
  // }
  // if (orderBy === 'distanceAsc') {
  //   return 'ORDER BY distance ASC';
  // }
  return 'ORDER BY "Post"."id" DESC';
}
