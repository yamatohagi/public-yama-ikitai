import {Client, Language} from '@googlemaps/google-maps-services-js';

export const findLocationsByWord = async (word: string) => {
  const client = new Client({});
  try {
    const response = await client.textSearch({
      params: {
        language: Language.ja,
        query: word,
        key: process.env.GOOGLE_MAP_API_KEY as any,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const findPlaceById = async (placeId: string) => {
  const client = new Client({});
  try {
    const response = await client.placeDetails({
      params: {
        language: Language.ja,
        place_id: placeId,
        key: process.env.GOOGLE_MAP_API_KEY as any,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
