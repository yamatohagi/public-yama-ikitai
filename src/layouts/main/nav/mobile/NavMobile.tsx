import {useState, useEffect} from 'react';
// next
import {useRouter} from 'next/router';
// @mui
import {List, Drawer, IconButton} from '@mui/material';
// config
import {NAV} from 'src/config-global';
// components

import Iconify from 'src/components/iconify';

//
import {useAuth} from 'src/hooks/use-auth';
import {css} from 'styled-system/css';
import {NavProps} from '../types';
import NavList from './NavList';

export default function NavMobile({data: rawDate}: NavProps) {
  const {pathname} = useRouter();
  const {userId} = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addDate = [
    ...rawDate,
    {title: 'マイページ', path: `/users/${userId}`, icon: <Iconify icon="iconamoon:profile-circle-fill" width={25} className={css({mb: 1})} />},
  ];
  const data = userId
    ? addDate.filter((item) => item.title !== 'ログイン')
    : addDate.filter((item) => item.title !== 'ログアウト' && item.title !== 'マイページ');

  return (
    <>
      <IconButton onClick={handleOpen} sx={{color: 'inherit', width: '32px', height: '32px'}}>
        <Iconify icon="clarity:menu-line" width={25} />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 4,
            width: NAV.W_BASE,
          },
        }}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'flex-start',
          })}
        >
          <IconButton onClick={handleClose} sx={{mx: 1.5, my: 1}}>
            <Iconify icon="fe:close" width={27} />
          </IconButton>
        </div>

        <List component="nav" disablePadding>
          {data.map((link) => (
            <NavList key={link.title} item={link} />
          ))}
        </List>
      </Drawer>
    </>
  );
}
