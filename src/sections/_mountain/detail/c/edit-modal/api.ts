import {useAtom} from 'jotai';
import {trpc} from 'src/utils/trpc';
import {GetMountainRefetchTspAtom} from '../../state';
import {GetMtPhotosTspAtom} from '../image/state';
import {GetMtFacilityTspAtom} from './state';
import {GetTrailheadsTspAtom} from '../trailhead/state';

type UpdateMountainProps = {
  closeModal: VoidFunction;
};

export function UpdateMountain({closeModal}: UpdateMountainProps) {
  const [, setGetMtFacilityTspAtom] = useAtom(GetMtFacilityTspAtom);
  const [, setGetMountainRefetchTspAtom] = useAtom(GetMountainRefetchTspAtom);
  const [, setGetMtPhotosTspAtom] = useAtom(GetMtPhotosTspAtom);
  const [, setGetTrailheadsTspAtom] = useAtom(GetTrailheadsTspAtom);

  const update = trpc.mountains.upsertRequest.useMutation({
    onSuccess: (data) => {
      const timeStamp = Date.now();
      setGetMtFacilityTspAtom(timeStamp);
      setGetMtPhotosTspAtom(timeStamp);
      setGetTrailheadsTspAtom(timeStamp);
      setGetMountainRefetchTspAtom(timeStamp);
      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
