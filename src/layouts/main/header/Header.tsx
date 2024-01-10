// @mui
import {useTheme} from '@mui/material/styles';
import {Box, Stack, AppBar, Toolbar, Container} from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import {bgBlur} from 'src/utils/cssStyles';
// routes
// config
import {HEADER} from 'src/config-global';
// components
import Logo from 'src/components/logo';

//
import HeaderLoginButton from 'src/layouts/LoginButton';
import {useAuth} from 'src/hooks/use-auth';
import {NavMobile, NavDesktop, navConfig} from '../nav';
import Searchbar from '../../components/Searchbar';

type Props = {
  headerOnDark: boolean;
};

export default function Header({headerOnDark}: Props) {
  const theme = useTheme();
  const {userId} = useAuth();
  //  const isMdUp = useResponsive('up', 'md');
  const isMdUp = false;

  const isOffset = useOffSetTop();

  return (
    <AppBar
      color="transparent"
      sx={{
        left: '50%', // 上のバーを中央に寄せる
        transform: 'translateX(-50%)', // 上のバーを中央に寄せる
        maxWidth: '600px',
        boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(isOffset && {
            ...bgBlur({color: theme.palette.background.default}),
            color: 'text.primary',
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        {isMdUp ? (
          <Container sx={{height: 1, display: 'flex', alignItems: 'center'}}>
            <Box sx={{lineHeight: 0, position: 'relative'}}>
              <Logo />
            </Box>

            {isMdUp && <NavDesktop data={navConfig} />}

            <Stack spacing={2} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
              <Stack spacing={1} direction="row" alignItems="center">
                {!userId && <HeaderLoginButton />}

                <Searchbar />
              </Stack>
            </Stack>

            {!isMdUp && <NavMobile data={navConfig} />}
          </Container>
        ) : (
          <Container
            sx={{
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
              <NavMobile data={navConfig} />
            </Box>
            {!headerOnDark && (
              <Box sx={{lineHeight: 0, position: 'relative'}}>
                <Logo />
              </Box>
            )}

            <Stack
              spacing={2}
              flexGrow={1}
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}
            >
              <Stack spacing={1} direction="row" alignItems="center">
                {!userId && <HeaderLoginButton />}
                <Searchbar />
              </Stack>
            </Stack>
          </Container>
        )}
      </Toolbar>

      {/* {true && <HeaderShadow />} */}
    </AppBar>
  );
}
