import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Checkbox,
  FormControlLabel,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListItem,
  Box,
  Grid,
} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import {TransitionProps} from '@mui/material/transitions';
import {styled} from '@mui/system';
import React from 'react';
import {useModalState} from 'src/components/provider/modalStateStore';

import {trpc} from 'src/utils/trpc';
import {useMtFacilityPhotoFilterStore} from 'src/components/provider/mtFacilityPhotoFilterStore';
import {css} from 'styled-system/css';

const StyledDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialog-paper': {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
      maxHeight: '100vh',
    },
  },
}));

export const PrefectureSearchModal = () => {
  const {closeModal, modals} = useModalState();
  const isOpen = modals.HomeButtonGroup || false;
  const handleClose = () => closeModal('HomeButtonGroup');
  const {liveState, applyFilters, setLiveValueByKey} = useMtFacilityPhotoFilterStore();

  /* 山のエリアを取得 */
  const {data} = trpc.hashTag.findMany.useQuery({
    select: {
      id: true,
      tag: true,
    },
  });

  const filters = data
    ? [
        {
          key: 'includeHashTags',
          name: 'ハッシュタグ',
          options: data?.map((area) => ({
            label: area.tag,
            value: area.tag,
          })),
        },
      ]
    : [];

  const filterHandleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, key: string, label: string) => {
    const [[...value], setValue, labelValue] = liveState(key);
    const checkedValue = event.target.name;

    if (event.target.checked) {
      setLiveValueByKey(key, {value: [...value, checkedValue], label: [...labelValue, label]});
    } else {
      setValue(
        value.filter((item) => item !== checkedValue),
        value.filter((item) => item !== checkedValue)
      );
    }
  };

  const handleFilter = () => {
    handleClose();
    applyFilters();
  };

  return (
    <div>
      <StyledDialog open={isOpen} TransitionComponent={Transition} keepMounted onClose={handleClose} fullScreen>
        <AppBar
          sx={{
            boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.05)',
          }}
          position="relative"
          style={{background: 'white'}}
        >
          <Toolbar sx={{display: 'flex', justifyContent: 'center'}}>
            <IconButton edge="start" style={{color: '#212B36'}} onClick={handleClose} aria-label="close">
              <Iconify icon="mdi:map-marker" width={24} style={{verticalAlign: 'middle'}} />
            </IconButton>
            <Typography variant="h6" style={{color: '#212B36'}}>
              タグで絞り込む
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <div
            style={{
              marginTop: '2rem',
            }}
          >
            <Grid container spacing={0}>
              {filters.map((filter, index) => (
                <Grid item xs={12} key={index}>
                  <Box>
                    <Typography variant="h6" sx={{mb: 2}}>
                      {filter.name}
                    </Typography>
                    <Grid container spacing={0}>
                      {filters.length > 0 ? (
                        filter.options.map((option, index) => (
                          <Grid item xs={6} sm={6} key={index}>
                            <ListItem sx={{pt: 0.5}}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="secondary"
                                    name={option.value.toString()}
                                    checked={liveState(filter.key)[0].includes(option.value.toString())}
                                    onChange={(e) => filterHandleCheckboxChange(e, filter.key, option.label)}
                                  />
                                }
                                label={option.label}
                              />
                            </ListItem>
                          </Grid>
                        ))
                      ) : (
                        <>lo</>
                      )}
                    </Grid>
                  </Box>
                  <div
                    style={{
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: '97%',
                      height: '1px',
                      background: '#EDEDED',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <IconButton edge="start" style={{color: '#212B36'}} onClick={handleClose} aria-label="close" sx={{flex: 2}}>
            <Iconify icon="ic:baseline-close" width={33} style={{verticalAlign: 'middle', color: 'gray'}} />
          </IconButton>

          <Button
            className={css({
              background: '#367B9D',
            })}
            onClick={handleFilter}
            fullWidth
            color="secondary"
            sx={{flex: 10}}
            size="large"
            variant="contained"
          >
            このエリアで絞り込む
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);
