import {useAtom} from 'jotai';
import {trpc} from 'src/utils/trpc';
import {UserDetailGetTspAtom} from '../../state';

type UpdateMountainProps = {
  closeModal: VoidFunction;
};

export function UpdateMountain({closeModal}: UpdateMountainProps) {
  const [, setGetMtMemoTspAtom] = useAtom(UserDetailGetTspAtom);

  const update = trpc.user.update.useMutation({
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
