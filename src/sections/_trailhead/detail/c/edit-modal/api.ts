import {atom, useAtom} from 'jotai';
import {trpc} from 'src/utils/trpc';

type UpdateMountainProps = {
  refetch: VoidFunction;
  closeModal: VoidFunction;
};

export const UpdatedRefetchAtom = atom(0);

export function UpdateMountain({refetch, closeModal}: UpdateMountainProps) {
  const [, setUpdatedRefetch] = useAtom(UpdatedRefetchAtom);
  const update = trpc.trailhead.update.useMutation({
    onSuccess: (data) => {
      const timeStamp = Date.now();
      setUpdatedRefetch(timeStamp);

      refetch();
      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
