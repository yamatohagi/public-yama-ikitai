import {getMtf} from '../query-service/facilityQs';

export const transformTrailheads = (mtf: Awaited<ReturnType<typeof getMtf>>) => {
  return mtf.map((mtFacility) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {MtFacilityType, MtFacilityToPhoto, MountainToMtFacility, Area, ...rest} = mtFacility;
    return {
      ...rest,

      MtFacilityType: mtFacility.MtFacilityType.map((mtFacilityType) => ({
        id: mtFacilityType.id,
        name: mtFacilityType.name,
      })),
      area: {
        id: mtFacility.Area?.id || 0,
        name: mtFacility.Area?.name || '',
      },
      mountains: mtFacility.MountainToMtFacility.map((mt, index) => ({
        id: mt.Mountain.id,
        name: mt.Mountain.name,
      })),
      photos: mtFacility.MtFacilityToPhoto.map((p) => ({
        id: p.Photo.id,
        postId: p.Photo.postId,
        thumbnail: p.Photo.thumbnail,
        original: p.Photo.original,
      })),
    };
  });
};
