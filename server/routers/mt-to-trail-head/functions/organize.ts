import {TrailheadGetQueryRawType} from '../type';

export const transformTrailheads = (rawTrailheads: TrailheadGetQueryRawType[]): TrailheadTransformedType[] =>
  rawTrailheads.map((trailhead) => ({
    id: trailhead.Trailhead_id,
    createdAt: trailhead.Trailhead_createdAt,
    updatedAt: trailhead.Trailhead_updatedAt,
    deletedAt: trailhead.Trailhead_deletedAt,
    areaId: trailhead.Trailhead_areaId,
    name: trailhead.Trailhead_name,
    nameKana: trailhead.Trailhead_nameKana,
    intro: trailhead.Trailhead_intro,
    postalCode: trailhead.Trailhead_postalCode,
    prefecture: trailhead.Trailhead_prefecture,
    address1: trailhead.Trailhead_address1,
    address2: trailhead.Trailhead_address2,
    address3: trailhead.Trailhead_address3,
    lat: trailhead.Trailhead_lat,
    lng: trailhead.Trailhead_lng,
    lastConbiniName: trailhead.Trailhead_lastConbiniName,
    lastConbiniNameKana: trailhead.Trailhead_lastConbiniNameKana,
    lastConbiniLat: trailhead.Trailhead_lastConbiniLat,
    lastConbiniLng: trailhead.Trailhead_lastConbiniLng,
    popularRating: trailhead.Trailhead_popularRating,
    hpRating: trailhead.Trailhead_hpRating,

    myCarReg: trailhead.Trailhead_myCarReg,
    intensity: trailhead.Trailhead_intensity,
    view: trailhead.Trailhead_view,
    toilet: trailhead.Trailhead_toilet,
    vendingMachine: trailhead.Trailhead_vendingMachine,
    store: trailhead.Trailhead_store,
    remark: trailhead.Trailhead_remark,
    area: {
      id: trailhead.Area_id,
      name: trailhead.Area_name,
    },
    mountains: trailhead.Mountain_ids.map((id, index) => ({
      id,
      name: trailhead.Mountain_names[index],
    })),
  }));

export type TrailheadTransformedType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  areaId: number | null;
  name: string;
  nameKana: string;
  intro: string | null;

  postalCode: number | null;
  prefecture: String | null;
  address1: String | null;
  address2: String | null;
  address3: String | null;

  lat: number | null;
  lng: number | null;
  lastConbiniName: string | null;
  lastConbiniNameKana: string | null;
  lastConbiniLat: number | null;
  lastConbiniLng: number | null;
  popularRating: number | null;
  hpRating: number | null;

  myCarReg: number | null;
  intensity: number | null;
  view: number | null;
  toilet: number | null;
  vendingMachine: number | null;
  store: number | null;
  remark: string | null;

  area: {
    id: number;
    name: string;
  };
  mountains: {
    id: number;
    name: string;
  }[];
};
