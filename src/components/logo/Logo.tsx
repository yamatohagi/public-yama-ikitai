import {memo} from 'react';
// next
import NextLink from 'next/link';

import {Box, BoxProps, Link} from '@mui/material';
import Image from 'next/image';

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({single = false, sx}: LogoProps) {
  const singleLogo = (
    <Image
      unoptimized
      alt="500"
      src="/assets/logo-white/logo.svg"
      width={100} // Set the width you want here
      height={85} // This will keep the aspect ratio intact
      // sx={{
      //   width: 100, // Set the width you want here
      //   height: 65, // This will keep the aspect ratio intact
      // }}
    />
  );

  const fullLogo = (
    <Image
      unoptimized
      alt="500"
      src="/assets/logo-main/logo.svg"
      width={100} // Set the width you want here
      height={65} // This will keep the aspect ratio intact
      priority
      // sx={{
      //   width: 100, // Set the width you want here
      //   height: 65, // This will keep the aspect ratio intact
      // }}
    />
  );

  return (
    <Link component={NextLink} href="/" color="inherit" aria-label="go to homepage" sx={{lineHeight: 0}}>
      <Box
        sx={{
          width: single ? 94 : 85,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        {single ? singleLogo : fullLogo}
      </Box>
    </Link>
  );
}

export default memo(Logo);
