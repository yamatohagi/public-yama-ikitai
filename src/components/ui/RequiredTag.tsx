import { Box } from '@mui/material';

const RequiredTag = () => (
  <Box
    component="span"
    sx={{
      backgroundColor: '#FF4545',
      color: 'white',
      borderRadius: '4px',
      padding: '3px 5px',
      fontWeight: 'bold',
      fontSize: 10,
      ml: 0.5,
    }}
  >
    必須
  </Box>
);

export default RequiredTag;
