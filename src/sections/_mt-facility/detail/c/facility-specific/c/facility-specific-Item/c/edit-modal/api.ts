import {trpc} from 'src/utils/trpc';

type UpdateFacilitySpecificProps = {
  refresh: VoidFunction;
  closeModal: VoidFunction;
};
export function UpdateFacilitySpecific({refresh, closeModal}: UpdateFacilitySpecificProps) {
  const update = trpc.mtFacilities.updateSpecificItem.useMutation({
    onSuccess: (data) => {
      refresh();
      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
