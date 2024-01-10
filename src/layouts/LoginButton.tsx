// @mui
import {Link} from '@mui/material';
//
import React from 'react';
import NextLink from 'next/link';

export default function HeaderLoginButton() {
  const handleLogin = () => {};

  return (
    <Link component={NextLink} href="/api/auth/signin" color="inherit">
      <button
        type="button"
        onClick={handleLogin}
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        ログイン
      </button>
    </Link>
  );
}
