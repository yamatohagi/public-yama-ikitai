import {useModalState} from 'src/components/provider/useModalStateJotai';
import {useState} from 'react';
import {Box, Button} from '@mui/material';
import {css} from 'styled-system/css';
import LocationsModal, {NameInputModalAtom} from '../modal';
import useAddressSet from '../hooks/use-address-setter/useAddressSet';

type SearchLocationButtonProps = {
  searchWord: string | undefined | null;
  setPostalCode: (postalCode: string | undefined) => void;
  setPrefecture: (prefecture: string | undefined) => void;
  setAddress1: (address1: string | undefined) => void;
  setAddress2: (address2: string | undefined) => void;
  setLat: (lat: number | undefined) => void;
  setLng: (lng: number | undefined) => void;
  setName?: (name: string | undefined) => void;
  setUrl?: (url: string | undefined) => void;
  buttonText?: string;
};
export default function SearchLocationButton({
  searchWord,
  setPostalCode,
  setPrefecture,
  setAddress1,
  setAddress2,
  setLat,
  setLng,
  setName,
  setUrl,
  buttonText,
}: SearchLocationButtonProps) {
  const {openModal} = useModalState(NameInputModalAtom);
  const [placeId, setPlaceId] = useState<string | undefined>();

  useAddressSet({
    placeId,
    setPostalCode,
    setPrefecture,
    setAddress1,
    setAddress2,
    setLat,
    setLng,
    setName,
    setUrl,
  });

  const handleAddressSearchClick = () => {
    if (!searchWord) return;

    openModal({
      setPlaceId,
      word: searchWord,
    });
  };

  return (
    <>
      <LocationsModal />
      <Box sx={{mx: 0}}>
        <Button
          className={css({
            background: searchWord === '' ? '' : '#367B9D',
          })}
          size="medium"
          type="button"
          onClick={handleAddressSearchClick}
          color="secondary"
          variant="contained"
          disabled={searchWord === ''}
          sx={{mt: 1, width: '100%'}}
        >
          {buttonText || '住所検索'}
        </Button>
      </Box>
    </>
  );
}
