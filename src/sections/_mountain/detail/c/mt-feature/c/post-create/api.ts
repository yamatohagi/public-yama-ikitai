import {useAtom} from 'jotai';
import {trpc} from 'src/utils/trpc';
import {MtFeatureItemPhotoGetTspAtom} from '../mt-feature-item/state';

type UpdateFacilitySpecificProps = {
  closeModal: VoidFunction;
  refetch?: VoidFunction;
};
export function UpdateFacilitySpecific({closeModal, refetch}: UpdateFacilitySpecificProps) {
  const [, setMtFeatureItemPhotoGetTsp] = useAtom(MtFeatureItemPhotoGetTspAtom);

  const update = trpc.post.createWithHashtag.useMutation({
    onSuccess: (data) => {
      // setGetMtFeaturesTsp(Date.now());//これ大丈夫そうだったら消す
      setMtFeatureItemPhotoGetTsp(Date.now());
      refetch?.();
      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
