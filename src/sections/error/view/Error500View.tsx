// next
import NextLink from 'next/link';
// @mui
import {Button} from '@mui/material';

export default function Error500View() {
  return (
    <Button component={NextLink} href="/" size="large" color="inherit" variant="contained">
      Go to Home
    </Button>
  );
}
