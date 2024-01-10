import {useState} from 'react';
// @mui
import {styled, alpha, Theme} from '@mui/material/styles';
import {Input, Slide, Button, SxProps, IconButton, InputAdornment, ClickAwayListener} from '@mui/material';
// config
import {HEADER} from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
import {useMtFilterStore} from 'src/components/provider/mtFilterStore';
import {useRouter} from 'next/router';
import {css} from 'styled-system/css';

const StyledSearchbar = styled('div')(({theme}) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER.H_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: HEADER.H_MAIN_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

type SearchbarProps = {
  sx?: SxProps<Theme>;
};

export default function Searchbar({sx}: SearchbarProps) {
  const {liveState, applyFilters} = useMtFilterStore();
  const [, setValue] = liveState('SearchButtonWithInput');
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    if (searchText === '') {
      setOpen(false);
      return;
    }
    setValue(searchText, searchText);
    setSearchText('');
    applyFilters();
    setOpen(false);
    router.push('/mountains');
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButton color="inherit" aria-label="search" onClick={handleOpen} sx={sx}>
          <Iconify icon="iconamoon:search-light" width={24} />
        </IconButton>

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              value={searchText}
              autoFocus
              fullWidth
              disableUnderline
              placeholder="山名、地名、キーワードで検索"
              onChange={(e) => setSearchText(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="carbon:search" sx={{color: 'text.disabled'}} />
                </InputAdornment>
              }
              sx={{mr: 1, fontWeight: 'fontWeightBold'}}
            />
            <Button
              className={css({
                background: '#367B9D',
              })}
              variant="contained"
              onClick={handleClose}
            >
              検索
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
