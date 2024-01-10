import {useEffect} from 'react';
import GetLocationDetail from './api';

/**
 * jotai経由でplaceIdにidを入れれば与えられた関数に住所情報を入れてくれる
 */

type useAddressSetProps = {
  placeId: undefined | string;
  setPostalCode: (postalCode: string | undefined) => void;
  setPrefecture: (prefecture: string | undefined) => void;
  setAddress1: (address1: string | undefined) => void;
  setAddress2: (address2: string | undefined) => void;
  setLat: (lat: number | undefined) => void;
  setLng: (lng: number | undefined) => void;
  setName?: (name: string | undefined) => void;
  setUrl?: (url: string | undefined) => void;
};

export default function useAddressSet({
  placeId,
  setPostalCode,
  setPrefecture,
  setAddress1,
  setAddress2,
  setLat,
  setLng,
  setName,
  setUrl,
}: useAddressSetProps) {
  const {location} = GetLocationDetail({placeId});

  useEffect(() => {
    if (!location) return;
    setPostalCode(location.postalCode ? location.postalCode?.split('-').join('').toString() : '');
    setPrefecture(location?.prefecture);
    setAddress1(location?.address1);
    setAddress2(location?.address2);
    setLat(location?.lat);
    setLng(location?.lng);
    if (setUrl) setUrl(location?.url);
    if (setName) setName(location?.name);
  }, [location]);
}
