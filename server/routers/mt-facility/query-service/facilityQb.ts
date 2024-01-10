import {MtFacilityFindManyRawSchema} from '../schemas/mtFacilityFindManyRawSchema';

type FilterHandlers = {
  [K in any]: (
    // ここFilterKey
    data: string[],
    input: (typeof MtFacilityFindManyRawSchema)['_type'],
    index: number
  ) => any;
}; //= >Prisma.MountainWhereInput

const filterHandlers: FilterHandlers = {
  // めちゃくちゃ遠い山小屋とか面白そうじゃん
  // uphillTimeMax(data, _, index) {
  //   if (data && data.length > 0) {
  //     return [`"MountainToTrailhead"."uphillTime" <= $${index}`, Number(data[0])];
  //   }
  //   return null;
  // },
  // uphillTimeMin(data, _, index) {
  //   if (data && data.length > 0) {
  //     return [`"MountainToTrailhead"."uphillTime" >= $${index}`, Number(data[0])];
  //   }
  //   return null;
  // },
  elevationMax(data, _, index) {
    if (data && data.length > 0) {
      return [`"MtFacility"."listElevation" <= $${index}`, Number(data[0])];
    }
    return null;
  },
  elevationMin(data, _, index) {
    if (data && data.length > 0) {
      return [`"MtFacility"."listElevation" >= $${index}`, Number(data[0])];
    }
    return null;
  },
  searchInput(data, input, index) {
    const searchValue = input.searchFilter?.searchInput?.value;
    if (searchValue) {
      return [`"MtFacility"."name" LIKE $${index}`, `%${searchValue}%`];
    }
    return null;
  },
  mtArea(areaFilter, _, index) {
    if (areaFilter.length > 0) {
      const placeholders = areaFilter.map((_, idx) => `$${index + idx}`).join(', ');
      const sqlClause = `"MtFacility"."areaId" IN (${placeholders})`;

      return [sqlClause, ...areaFilter.map((v) => Number(v))];
    }
    return [null, []];
  },
  area(areaFilter, _, index) {
    if (areaFilter.length > 0) {
      const placeholders = areaFilter.map((_, idx) => `$${index + idx}`).join(', ');
      const sqlClause = `"MtFacility"."prefecture" IN (${placeholders})`;
      return [sqlClause, ...areaFilter];
    }
    return [null, []];
  },

  various(data, _, index) {
    if (data.length > 0) {
      const clauses = [];
      const bindValues = [];
      if (data.includes('twoOrMoreMountains')) {
        clauses.push(`"MtFacility"."id" IN (
                          SELECT "mtFacilityId"
                          FROM "MountainToMtFacility"
                          GROUP BY "mtFacilityId"
                          HAVING COUNT("mountainId") >= $${index}
                      )`);
        bindValues.push(2);
        index++;
      }
      const sqlClause = clauses.length > 0 ? clauses.join(' OR ') : '';
      return [sqlClause, ...bindValues];
    }
    return [null, []];
  },
};

export function generateSQLWhereClause(input: (typeof MtFacilityFindManyRawSchema)['_type'], index: number) {
  const {searchFilter} = input;
  const finalFilters: string[] = [];
  const bindValues: any[] = [];

  const uniqueKeys = searchFilter ? Object.keys(searchFilter) : [];

  // SearchFilterの絞り込み
  let placeholderIndex = index; // lat, lngの分
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

  // areaIdがあれば、areaIdで絞る
  if (input.areaId) {
    finalFilters.push(`"MtFacility"."areaId" = $${placeholderIndex}`);
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
      `"MtFacility"."lat" BETWEEN $${placeholderIndex} AND $${placeholderIndex + 1} AND "MtFacility"."lng" BETWEEN $${placeholderIndex + 2} AND $${
        placeholderIndex + 3
      }`
    );
    placeholderIndex += 4;
  }

  return [finalFilters.length ? `WHERE ${finalFilters.join(' AND ')}` : '', bindValues];
}

export function generateSQLOrderClause(input: (typeof MtFacilityFindManyRawSchema)['_type']) {
  const {orderBy} = input;
  // memo:  SELECT DISTINCT ON ("Mountain"."id", "Mountain"."elevation", distance)に足してから以下に書く
  if (orderBy === 'mtPeakDesc') {
    return 'ORDER BY "MtFacility"."listElevation" DESC';
  }
  if (orderBy === 'distanceAsc') {
    return 'ORDER BY distance ASC';
  }
  return 'ORDER BY "Trailhead"."id" DESC';
}
