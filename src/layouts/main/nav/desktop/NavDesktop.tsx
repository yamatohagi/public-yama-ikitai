// @mui
import {Stack} from '@mui/material';
import {useAuth} from 'src/hooks/use-auth';
import {NavProps} from '../types';
import NavList from './NavList';

export default function NavDesktop({data: rawDate, sx}: NavProps) {
  const {userId} = useAuth();

  const data = userId
    ? rawDate.filter((item) => item.title !== 'ログイン')
    : rawDate.filter((item) => item.title !== 'ログアウト' && item.title !== 'マイページ');

  return (
    <Stack
      component="nav"
      direction="row"
      spacing={6}
      sx={{
        ml: 6,
        height: 1,
        ...sx,
      }}
    >
      {data.map((link) => (
        <NavList key={link.title} item={link} />
      ))}
    </Stack>
  );
}
