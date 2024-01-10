import { FC } from 'react';
import { Tooltip, IconButton, Box } from '@mui/material';
import Iconify from '../iconify/Iconify';

type Props = {
  width: number;
  height: number;
  orderNumber: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, orderNumber: number) => void;
};

export const ImageInput: FC<Props> = ({ width, height, orderNumber, handleChange }) => (
  <Box>
    <Tooltip title="画像アップロード">
      <IconButton
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          backgroundColor: (theme) => theme.palette.grey[300],
          width,
          height,
          position: 'relative',
        }}
      >
        <input
          type="file"
          onChange={(e) => handleChange(e, orderNumber)}
          value=""
          style={{
            opacity: 0,
            width,
            height,
            position: 'absolute',
          }}
        />
        <Iconify icon="material-symbols:image-outline" sx={{ width: 25, height: 25 }} />
      </IconButton>
    </Tooltip>
  </Box>
);
