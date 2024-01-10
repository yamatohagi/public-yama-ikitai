import {publicProcedure, t} from 'server/trpc';
import {AddressType} from '@googlemaps/google-maps-services-js/dist/common';
import {FindLocationsSchema} from './schemas/getUseMapApiRouteSchema';
import {findLocationsByWord, findPlaceById} from './repository';
import {FindLocationDetailSchema} from './schemas/findLocationDetailSchema';

export const mapRouter = t.router({
  findLocations: publicProcedure.input(FindLocationsSchema).query(async ({ctx, input}) => {
    const data = await findLocationsByWord(input.word); // ワードから情報を取得
    // pickする
    const pickedLocationFields = data.results.map((location) => ({
      placeId: location.place_id,
      name: location.name,
      address: location.formatted_address,
      lat: location.geometry?.location.lat,
      lng: location.geometry?.location.lng,
    }));
    return pickedLocationFields;
  }),
  findLocationDetail: publicProcedure.input(FindLocationDetailSchema).query(async ({ctx, input}) => {
    const data = await findPlaceById(input.placeId); // ワードから情報を取得
    // pickする

    const address1 = data.result.address_components?.find((address) => address.types.includes(AddressType.locality))?.long_name;

    const address2 = data.result.formatted_address?.split(address1?.toString() || '')[1]?.trim();

    const pickedLocationFields = {
      name: data.result.name,
      nameKana: data.result.name,
      postalCode: data.result.address_components?.find((address) => address.types.includes(AddressType.postal_code))?.long_name,
      prefecture: data.result.address_components?.find((address) => address.types.includes(AddressType.administrative_area_level_1))?.long_name,
      address1,
      address2,
      lat: data.result.geometry?.location.lat,
      lng: data.result.geometry?.location.lng,
      url: data.result.url,
    };
    return pickedLocationFields;
  }),
});
