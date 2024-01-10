import {useAtom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useEffect} from 'react';
import {useAuth} from 'src/hooks/use-auth';

type MtSearchSettingNonOptional = {
  from: {
    lat: number;
    lng: number;
    label: string;
  };
  dayMoveMaxTime: number;
  stayStartTime: string;
  startDayOfWeek: number;
  coordinatesRadius: number;
};

const initialValue: MtSearchSettingNonOptional = {
  from: {
    lat: 35.515181,
    lng: 139.430513,
    label: '東京駅',
  },
  dayMoveMaxTime: 480, // 10時間 5時に出て15時に着く
  stayStartTime: '07:00',
  startDayOfWeek: 5,
  coordinatesRadius: 100000, // 100km
};

// 緯度経度の原子を作成し、セッションストレージで永続化
const MtSearchSettingAtom = atomWithStorage<MtSearchSettingNonOptional>(
  'mtSearchLatLngStore', // ユニークな名前
  initialValue,
  createJSONStorage(() => sessionStorage)
);

export const useMtSearchSetting = () => {
  const [, set] = useAtom(MtSearchSettingAtom);
  const {userInfo} = useAuth({userInfo: true});

  useEffect(() => {
    if (userInfo) {
      set((prev) => ({
        ...prev,
        from: {
          lat: userInfo.startPointLat ?? prev.from.lat,
          lng: userInfo.startPointLng ?? prev.from.lng,
          label: userInfo?.startPointLabel ?? prev.from.label,
        },
        dayMoveMaxTime: userInfo.dayMoveMaxTime ?? prev.dayMoveMaxTime,
        stayStartTime: userInfo.stayStartTime ?? prev.stayStartTime,
        startDayOfWeek: userInfo.startDayOfWeek ?? prev.startDayOfWeek,
        coordinatesRadius: userInfo.coordinatesRadius ?? prev.coordinatesRadius,
      }));
    }
  }, [userInfo]);

  return useAtom(MtSearchSettingAtom);
};
