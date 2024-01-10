// next
import {useRouter} from 'next/router';
// @mui
import {Box} from '@mui/material';
// config
import {HEADER} from 'src/config-global';
//

import {useCallback, useMemo} from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import BottomNavBar from '../BottomNavBar';

const pathsOnDark = ['/career/landing', '/', '/travel/landing'];

const spacingLayout = [...pathsOnDark];

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({children}: Props) {
  const {pathname} = useRouter();

  //  const actionPage = (arr: string[]) => arr.some((path) => pathname === path);これメモ化したいuseCallback
  const actionPage = useCallback((arr: string[]) => arr.some((path) => pathname === path), [pathname]);

  //  const ap = actionPage(pathsOnDark);これもメモ化したいuseMemo
  const ap = useMemo(() => actionPage(pathsOnDark), [actionPage]);

  // actionPage(pathsOnDark)をメモ化
  const memoActionPage = useMemo(() => ap, [ap]);

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: 1}}>
      <Header headerOnDark={memoActionPage} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {!actionPage(spacingLayout) && <Spacing />}
        {children}
      </Box>
      {/* {pathname !== '/' ? <DynamicBreadcrumb currentPath={pathname} /> : <Box sx={{mb: 10}} />} */}
      <BottomNavBar />
      <Footer />
    </Box>
  );
}

function Spacing() {
  return (
    <Box
      sx={{
        height: {xs: HEADER.H_MOBILE, md: HEADER.H_MAIN_DESKTOP},
      }}
    />
  );
}
