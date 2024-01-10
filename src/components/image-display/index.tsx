import {FC} from 'react';
import {Box} from '@mui/material';
import Image from 'next/image';

type Props = {
  width: number;
  height: number;
  photoURL: string;
  orderNumber: number;
  photoImageId: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, orderNumber: number, photoImageId: string) => void;
};

export const ImageDisplay: FC<Props> = ({width, height, photoURL, orderNumber, photoImageId, handleChange}) => (
  <Box sx={{width, height}}>
    <label htmlFor={`file-input-${orderNumber}`}>
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <Image src={photoURL} alt="img" fill sizes="33vw" style={{borderRadius: '50%'}} />
      </div>
      <input
        id={`file-input-${orderNumber}`}
        type="file"
        value=""
        onChange={(e) => handleChange(e, orderNumber, photoImageId)}
        style={{display: 'none'}}
      />
    </label>
  </Box>
);
