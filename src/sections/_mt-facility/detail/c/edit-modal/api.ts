import {trpc} from 'src/utils/trpc';

type UpdateFacilitySpecificProps = {
  refetch: VoidFunction;
  closeModal: VoidFunction;
};
export function UpdateFacilitySpecific({refetch, closeModal}: UpdateFacilitySpecificProps) {
  const update = trpc.mtFacilities.update.useMutation({
    onSuccess: (data) => {
      refetch();
      closeModal(); // モーダルを閉じる
    },
    onError: (error) => {
      console.error('Error posting rating:', error);
    },
  });

  return {update};
}
