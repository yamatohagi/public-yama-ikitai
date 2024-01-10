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
import React, {memo} from 'react';
import {useModalState} from 'src/components/provider/modalStateStore';
import {usePostFilterStore} from 'src/components/provider/postFilterStore';
import {trpc} from 'src/utils/trpc';
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

export const regions = [
  {
    name: '北海道・東北',
    prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  },
  {
    name: '関東',
    prefectures: ['東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '栃木県', '群馬県'],
  },
  {
    name: '中部',
    prefectures: ['愛知県', '静岡県', '岐阜県', '三重県', '長野県', '山梨県', '新潟県', '富山県', '石川県', '福井県'],
  },
  {
    name: '近畿',
    prefectures: ['大阪府', '京都府', '兵庫県', '奈良県', '滋賀県', '和歌山県'],
  },
  {
    name: '中国',
    prefectures: ['広島県', '岡山県', '山口県', '島根県', '鳥取県'],
  },
  {
    name: '四国',
    prefectures: ['愛媛県', '香川県', '徳島県', '高知県'],
  },
  {
    name: '九州・沖縄',
    prefectures: ['福岡県', '佐賀県', '長崎県', '大分県', '熊本県', '宮崎県', '鹿児島県', '沖縄県'],
  },
];
// をmemoかつexportに変更

const Modal = () => {
  const {closeModal, modals} = useModalState();
  const isOpen = modals.HomeButtonGroup || false;
  const handleClose = () => closeModal('HomeButtonGroup');
  const {liveState, applyFilters, setLiveValueByKey} = usePostFilterStore();
  const [[...value], setValue] = liveState('area');

  /* 山のエリアを取得 */
  const {data} = trpc.area.findMany.useQuery({
    select: {
      id: true,
      name: true,
    },
  });

  const filters = data
    ? [
        {
          key: 'mtArea',
          name: '山のエリア',
          options: data?.map((area) => ({
            label: area.name,
            value: area.id,
          })),
        },
      ]
    : [];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prefecture = event.target.name;
    if (event.target.checked) {
      setValue([...value, prefecture], [...value, prefecture]);
    } else {
      setValue(
        value.filter((item) => item !== prefecture),
        value.filter((item) => item !== prefecture)
      );
    }
  };

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
              エリア絞り込み
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

              {regions.map((region, index) => (
                <Grid item xs={12} key={index}>
                  <Box>
                    <Typography variant="h6" sx={{mb: 2}}>
                      {region.name}
                    </Typography>
                    <Grid container spacing={0}>
                      {region.prefectures.map((prefecture, index) => (
                        <Grid item xs={6} sm={6} key={index}>
                          <ListItem sx={{pt: 0.5}}>
                            <FormControlLabel
                              control={
                                <Checkbox color="secondary" name={prefecture} checked={value.includes(prefecture)} onChange={handleCheckboxChange} />
                              }
                              label={prefecture}
                            />
                          </ListItem>
                        </Grid>
                      ))}
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
export const PrefectureSearchModal = memo(Modal);
const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);
