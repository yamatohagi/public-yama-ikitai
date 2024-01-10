import {createModalAtom, useModalState} from 'src/components/provider/useModalStateJotai';
import Divider from 'src/components/ui/Divider';
import Modal from 'src/components/Modal';
import GetLocations from './api';

export const NameInputModalAtom = createModalAtom<{
  word?: string;
  setPlaceId: (placeId: string) => void;
}>();

const LocationsModal = () => {
  const {modalProps, isOpen, closeModal} = useModalState(NameInputModalAtom);
  const {setPlaceId, word} = modalProps;

  const {locations, isLoading} = GetLocations({word});

  const handleCheck = (e: any) => {
    setPlaceId(e.target.value);
    closeModal();
  };

  if (isLoading) {
    return (
      <Modal open={isOpen} onClose={() => closeModal()}>
        <div>読み込み中</div>
      </Modal>
    );
  }

  if (!isLoading && locations?.length === 0) {
    closeModal();
    return <div>データがありません</div>;
  }

  return (
    <Modal open={isOpen} onClose={() => closeModal()}>
      {locations?.map((location, index) => {
        const [, , after] = location.address ? location.address.split(/(\d{3}-\d{4})/) : ['', '', ''];
        const radioId = `radio-${location.placeId}`;

        return (
          <div key={location.placeId}>
            <input type="radio" id={radioId} value={location.placeId} onClick={handleCheck} />
            <label htmlFor={radioId}>
              {location.name}
              <br />

              {after && <>{after}</>}
            </label>
            <Divider />
          </div>
        );
      })}
    </Modal>
  );
};
export default LocationsModal;
