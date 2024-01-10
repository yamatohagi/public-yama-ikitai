import { Box, SxProps } from '@mui/system';

const TextTag = ({
  text,
  color = 'white',
  bc,
  sx,
}: {
  text: string;
  color?: string;
  bc: string;
  sx?: SxProps;
}) => (
  <Box
    component="span"
    sx={{
      backgroundColor: bc,
      color,
      borderRadius: '4px',
      padding: '3px 5px',
      fontWeight: 'bold',
      fontSize: 10,
      mr: 0.3,
      ...sx,
    }}
  >
    {text}
  </Box>
);

export default TextTag;
