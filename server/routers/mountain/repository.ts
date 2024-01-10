/* eslint-disable @typescript-eslint/no-unused-vars */
import {Prisma} from '@prisma/client';
// import { prefecture } from 'src/utils/prefecture';
import {NMountainFindManySchema} from 'server/schemas/findManyMountain.schema';

import {MountainFinFirstProps, MountainFindManyProps, MountainsGetSql} from './type';

type FilterKey =
  | 'SearchButtonWithInput'
  | 'area'
  | 'schedule'
  | 'climbingTime'
  | 'tent'
  | 'mtPeakMax'
  | 'mtPeakMin'
  | 'uphillTimeMax'
  | 'uphillTimeMin'
  | 'trailheadDistanceTimeMax'
  | 'trailheadDistanceTimeMin';

// type AreaValue = (typeof prefecture)[number];
// type ScheduleValue = 'dayTrip' | 'oneNight' | 'twoNights';
// type ClimbingTimeValue = 'lessThanTwo' | 'twoToFour' | 'fourToSix' | 'sixToEight' | 'moreThanEight';
// type TentValue = 'bath' | 'lessWind' | 'overHundred' | 'noBugs';
// type FilterValue = AreaValue | ScheduleValue | ClimbingTimeValue | TentValue;

type FilterHandlers = {
  [K in any]: (
    // ここFilterKey
    data: string[],
    input: (typeof NMountainFindManySchema)['_type'],
    index: number
  ) => any;
}; //= >Prisma.MountainWhereInput

const filterHandlers: FilterHandlers = {
  trailheadDistanceTimeMax(data, input, index) {
    const speed = 49;
    const trailheadDistanceMax = calculateDistance(Number(data[0]), speed);

    const {lat, lng} = input!.from;
    const earthRadiusKm = 6378.137; // 地球の半径 (km)

    // 最大距離を半径としたときの緯度と経度の差
    const diffLat = (trailheadDistanceMax / earthRadiusKm) * (180 / Math.PI);
    const diffLng = (trailheadDistanceMax / (earthRadiusKm * Math.cos((Math.PI * lat) / 180))) * (180 / Math.PI);

    const latMin = lat - diffLat;
    const latMax = lat + diffLat;
    const lngMin = lng - diffLng;
    const lngMax = lng + diffLng;

    const sqlClause = `
    "Trailhead"."lat" BETWEEN $${index} AND $${index + 1}
    AND "Trailhead"."lng" BETWEEN $${index + 2} AND $${index + 3}
  `;

    return [sqlClause, latMin, latMax, lngMin, lngMax];
  },
  trailheadDistanceTimeMin(data, input, index) {
    const speed = 49;
    const trailheadDistanceMin = calculateDistance(Number(data[0]), speed);

    const {lat, lng} = input.from;
    const earthRadiusKm = 6378.137;

    const diffLat = (trailheadDistanceMin / earthRadiusKm) * (180 / Math.PI);
    const diffLng = (trailheadDistanceMin / (earthRadiusKm * Math.cos((Math.PI * lat) / 180))) * (180 / Math.PI);

    const latMin = lat - diffLat;
    const latMax = lat + diffLat;
    const lngMin = lng - diffLng;
    const lngMax = lng + diffLng;

    const sqlClause = `
    ("Trailhead"."lat" < $${index} OR "Trailhead"."lat" > $${index + 1})
    OR ("Trailhead"."lng" < $${index + 2} OR "Trailhead"."lng" > $${index + 3})
  `;

    return [sqlClause, latMin, latMax, lngMin, lngMax];
  },
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
      return [`"Mountain"."name" LIKE $${index}`, `%${searchValue}%`];
    }
    return null;
  },
  area(areaFilter, _, index) {
    if (areaFilter.length > 0) {
      const placeholders = areaFilter.map((_, idx) => `$${index + idx}`).join(', ');
      const sqlClause = `"Mountain"."prefecture" IN (${placeholders})`;
      return [sqlClause, ...areaFilter];
    }
    return [null, []];
  },

  schedule(data, input, index) {
    const clauses = [];
    const bindValues = [];

    if (data.includes('dayTrip')) {
      clauses.push(`"MountainToTrailhead"."upDownTime" < $${index}`);
      bindValues.push(input.dayMoveMaxTime);
      index++;
    }
    if (data.includes('oneNight')) {
      clauses.push(`"MountainToTrailhead"."upDownTime" < $${index}`);
      bindValues.push(input.dayMoveMaxTime * 2);
      index++;
    }
    if (data.includes('twoNights')) {
      clauses.push(`"MountainToTrailhead"."upDownTime" > $${index}`);
      bindValues.push(input.dayMoveMaxTime * 2);
      index++;
    }

    const sqlClause = clauses.length > 0 ? clauses.join(' OR ') : '';
    return [sqlClause, ...bindValues];
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
};

export const getMountainList = async ({input, ctx}: MountainFindManyProps) => {
  const {select, from, dayMoveMaxTime, stayStartTime, startDayOfWeek, searchFilter, ...other} = input;
  const limit = input.limit || 2;
  const cursor = input.cursor || 0;
  const nextCursor = cursor + limit;

  const {lat} = from; // 現在地の緯度
  const {lng} = from; // 現在地の経度

  const [whereClause, bindValues] = generateSQLWhereClause(input);
  const orderClause = generateSQLOrderClause(input);

  const baseQuery = MountainsGetSql(whereClause, orderClause);

  const stringQuery = ctx.prisma.$queryRawUnsafe<{Mountain_id: number}[]>(baseQuery, lat, lng, limit, cursor, ...bindValues);

  const countQuery = ctx.prisma.$queryRawUnsafe<{count: string}[]>(
    MountainsGetSql(whereClause, orderClause, true),
    lat, // いらないけど$indexの整合性のために入れておく
    lng, // いらないけど$indexの整合性のために入れておく
    limit, // いらないけど$indexの整合性のために入れておく
    cursor, // いらないけど$indexの整合性のために入れておく
    ...bindValues
  );

  const [mountains, count] = await Promise.all([stringQuery, countQuery]);

  return {mountains, count: Number(count[0].count), nextCursor};
};

export type Mountain = Prisma.MountainGetPayload<{include: {MountainToTrailhead: true}}>;

export const getMountain = async ({input, ctx}: MountainFinFirstProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const findFirstMountain = await ctx.prisma.mountain.findFirst({
    ...input,
  });

  return findFirstMountain;
};

function calculateDistance(minutes: number, speed: number): number {
  // 1時間は60分なので、時間単位に変換します
  const hours = minutes / 60;
  // 距離 = 速度 * 時間
  const distance = speed * hours;
  return distance;
}

function generateSQLWhereClause(input: (typeof NMountainFindManySchema)['_type']) {
  const {searchFilter} = input;
  const finalFilters: string[] = [];
  const bindValues: any[] = [];

  const uniqueKeys = searchFilter ? Object.keys(searchFilter) : [];

  let placeholderIndex = 5; // lat, lngの分
  uniqueKeys.forEach((uniqueKey) => {
    const handler = filterHandlers[uniqueKey as any];
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
  // inputにareaIdがある場合は、areaIdを使って絞り込む
  if (input.areaId) {
    finalFilters.push(`"Mountain"."areaId" = $${placeholderIndex}`);
    bindValues.push(input.areaId);
    placeholderIndex += 1;
  }
  // 緯度軽度で近いところ
  if (input.coordinates) {
    const radiusInLat = input.coordinates.radius / 111000; // メートルを緯度の度に変換します。
    const radiusInLng = input.coordinates.radius / (111000 * Math.cos(input.coordinates.lat * (Math.PI / 180))); // ここでは現在地の緯度を使用して、1度あたりのメートル数を計算します。
    const latMin = input.coordinates.lat - radiusInLat; // 範囲の最小値と最大値を計算します。
    const latMax = input.coordinates.lat + radiusInLat;
    const lonMin = input.coordinates.lng - radiusInLng;
    const lonMax = input.coordinates.lng + radiusInLng;
    bindValues.push(latMin, latMax, lonMin, lonMax);
    finalFilters.push(
      `"Mountain"."lat" BETWEEN $${placeholderIndex} AND $${placeholderIndex + 1} AND "Mountain"."lng" BETWEEN $${placeholderIndex + 2} AND $${
        placeholderIndex + 3
      }`
    );
    placeholderIndex += 4;
  }

  return [finalFilters.length ? `AND ${finalFilters.join(' AND ')}` : '', bindValues];
}

function generateSQLOrderClause(input: (typeof NMountainFindManySchema)['_type']) {
  const {orderBy} = input;
  // memo:  SELECT DISTINCT ON ("Mountain"."id", "Mountain"."elevation", distance)に足してから以下に書く
  if (orderBy === 'mtPeakDesc') {
    return 'ORDER BY "Mountain"."elevation" DESC';
  }
  if (orderBy === 'mtUphillTimeAsc') {
    return 'ORDER BY "MountainToTrailhead"."uphillTime" ASC';
  }
  if (orderBy === 'mtUphillTimeDesc') {
    return 'ORDER BY "MountainToTrailhead"."uphillTime" DESC';
  }
  if (orderBy === 'distanceAsc') {
    return 'ORDER BY distance ASC';
  }
  return 'ORDER BY "Mountain"."id" DESC';
}
