import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {GetMtFeaturesTspAtom} from '../../state';

type UpdateMountainFeatureProps = {
  closeModal: VoidFunction;
};
export function UpdateMountainFeature({closeModal}: UpdateMountainFeatureProps) {
  const [, setGetMtFeaturesTsp] = useAtom(GetMtFeaturesTspAtom);

  const update = trpc.mountainFeature.updateFeatureItem.useMutation({
    onSuccess: (data) => {
      setGetMtFeaturesTsp(Date.now());
      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
