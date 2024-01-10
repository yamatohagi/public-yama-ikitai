import {Box, SxProps} from '@mui/material';

const CommonTag = ({
  text = '必須',
  tc = 'white',
  bc = '#FF4545',
  border,
  sx,
}: {
  text?: string | null;
  tc?: string;
  bc?: string;
  border?: string;
  sx?: SxProps;
}) => (
  <Box
    component="span"
    sx={{
      backgroundColor: bc,
      color: tc,
      borderRadius: '4px',
      padding: '3px 5px',
      fontWeight: 'bold',
      fontSize: 10,
      marginLeft: 1,
      border,
      ...sx,
    }}
  >
    {text}
  </Box>
);

export default CommonTag;
