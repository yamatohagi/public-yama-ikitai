import {Button, IconButton, List, ListItem, TextField} from '@mui/material';
import Iconify from 'src/components/iconify';
import {useState} from 'react';
import {useMtSelectModal} from './modalState';
import {GetMtList} from './api';

type MtSelectModalInnerProps = {
  closeModal: () => void;
  modalProps: ReturnType<typeof useMtSelectModal>['modalProps'];
};

export default function MtSelectModalInner({closeModal, modalProps}: MtSelectModalInnerProps) {
  const [inputTextValue, setInputTextValue] = useState('');
  const {options} = GetMtList(inputTextValue);

  const handleChange = ({label, value}: {label: string; value: number}) => {
    modalProps.labelUpdate?.({
      mtId: value,
      newLabelText: label,
    });
    closeModal();
  };
  return (
    <>
      <TextField onChange={(e) => setInputTextValue(e.target.value)} fullWidth margin="normal" />

      <List>
        {options?.map((option, index) => (
          <ListItem key={index} disablePadding>
            <Button fullWidth variant="outlined" onClick={() => handleChange(option)} style={{justifyContent: 'flex-start'}}>
              {option.label}
            </Button>
          </ListItem>
        ))}
      </List>

      <IconButton edge="start" style={{color: '#212B36'}} onClick={closeModal} aria-label="close" sx={{flex: 2}}>
        <Iconify icon="ic:baseline-close" width={33} style={{verticalAlign: 'middle', color: 'gray'}} />
      </IconButton>
    </>
  );
}
