import {useAtom} from 'jotai';
import {trpc} from 'src/utils/trpc';
import {GetMtMemoTspAtom} from '../list/state';

type UpdateMountainProps = {
  closeModal: VoidFunction;
};

export function UpdateMountain({closeModal}: UpdateMountainProps) {
  const [, setGetMtMemoTspAtom] = useAtom(GetMtMemoTspAtom);

  const update = trpc.mtUrlMemo.update.useMutation({
    onSuccess: (data) => {
      const timeStamp = Date.now();
      setGetMtMemoTspAtom(timeStamp);

      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
