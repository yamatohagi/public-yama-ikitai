import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {PostDetailGetTspAtom} from '../../state';

type UpdateFacilitySpecificProps = {
  refresh?: VoidFunction;
  closeModal: VoidFunction;
};
export function UpdateFacilitySpecific({refresh, closeModal}: UpdateFacilitySpecificProps) {
  const [, setTsp] = useAtom(PostDetailGetTspAtom);
  const update = trpc.post.editWithHashtag.useMutation({
    onSuccess: (data) => {
      if (refresh) refresh();
      setTsp(Date.now());
      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
