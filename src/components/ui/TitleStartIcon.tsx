import { Box, SxProps } from '@mui/system';

const TitleStartIcon = ({ bc = '#367B9D', sx }: { bc?: string; sx?: SxProps }) => (
  <Box
    component="span"
    sx={{
      backgroundColor: bc,
      width: '1rem',
      height: '1rem',
      display: 'inline-block',
      flexShrink: 0,
      ...sx,
    }}
  />
);

export default TitleStartIcon;
