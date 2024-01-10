import {Dialog, DialogContent, DialogActions, Button, Slide, AppBar, Toolbar, IconButton, Typography, Grid} from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import {TransitionProps} from '@mui/material/transitions';
import {styled} from '@mui/system';

import React, {memo, useEffect, useState} from 'react';

import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';

import {useModalState} from 'src/components/provider/modalStateStore';
import {useKeyedSelectedStore} from 'src/components/provider/selectedPrefectureStore';
import {css} from 'styled-system/css';
import {useKeyedInputStore} from 'src/components/provider/inputStateStore';
import {trpc} from 'src/utils/trpc';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';

const StyledDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialog-paper': {
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
      maxHeight: '100vh',
    },
  },
}));

const StartPointSetModal = () => {
  // 検索候補を格納するState
  const [mtSearchSetting, setLatLng] = useMtSearchSetting();
  const [value, setValue] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const {data} = trpc.searchPlace.getSearchPlace.useQuery(
    {searchInput: value.replaceAll('駅', '')},
    {
      enabled: value !== '',
    }
  );

  // 検索候補を取得する関数
  const fetchSuggestions = (query: string) => {
    // 前回のタイマーをクリア
    if (timer) clearTimeout(timer);

    // 新しいタイマーをセット
    const newTimer = setTimeout(() => {
      console.log(query);
      setValue(query);
    }, 500); // 400ミリ秒の遅延

    setTimer(newTimer);
  };

  const debouncedFetchSuggestions = fetchSuggestions;

  const points = data?.map((v) => v);

  const {closeModal, modals} = useModalState();
  const {keyword, setKeyword} = useKeyedInputStore('searchPlaceInput');

  useEffect(() => {
    setKeyword(mtSearchSetting.from.label);
  }, []);

  const isOpen = modals.StartPointSetModal || false;
  const handleClose = () => closeModal('StartPointSetModal');

  const {selected, deleteSelected} = useKeyedSelectedStore('SearchPlaceInput');

  const router = useRouter();

  const handleSearch = () => {
    if (!data) return;
    const selectObf = data.find((v) => v.name === keyword);
    console.log(keyword);
    if (!selectObf) return;
    // コレが叩ければいいだけ
    if (!keyword || keyword === '') {
      deleteSelected(selected[0]);
      setLatLng((prev) => ({
        ...prev,
        from: {lat: 35.515181, lng: 139.430513, label: '東京駅'},
      }));

      return;
    }

    setLatLng((prev) => ({
      ...prev,
      from: {lat: selectObf.lat, lng: selectObf.lon, label: selectObf.name},
    }));
    // paths.mountain.searchに移動(next/link)
    router.push(paths.mountain.search.path);
    handleClose();
  };

  const handleSearchTop = (id: number) => {
    if (!data) return;
    const selectObf = data.find((v) => v.id === id);

    if (!selectObf) return;
    console.log(selectObf);
    setLatLng((prev) => ({
      ...prev,
      from: {lat: selectObf.lat, lng: selectObf.lon, label: selectObf.name},
    }));

    setTimeout(() => {
      handleClose();
    }, 200);
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
              出発地点を設定
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
              <Grid item xs={12} sm={12}>
                <div className={inputDivStyle}>
                  <div className={css({justifyContent: 'flex-start'})}>
                    <span
                      className={css({
                        fontSize: '0.91rem', // 地域の文字の大きさ
                        marginTop: '3px', // 地域が真ん中に来るように調整
                        color: '#367b9d', // 地域の文字色
                        marginLeft: '10px', // 地域の左の余白
                        fontWeight: 'semibold', // 地域の文字の太さ
                      })}
                    >
                      近くの駅
                    </span>
                  </div>
                  <div>
                    {/* 入力フィールドとオートコンプリートドロップダウンのラッパー */}
                    <div style={{position: 'relative', width: '100%'}}>
                      <form
                        action="/"
                        onSubmit={(e) => {
                          e.preventDefault(); // フォームのデフォルトの送信動作をキャンセル

                          handleSearch();
                        }}
                      >
                        <div style={{position: 'relative', width: '100%'}}>
                          <input
                            className={inputStyle}
                            type="search"
                            value={keyword}
                            onChange={(e) => {
                              const {value} = e.target;
                              setKeyword(value);
                              debouncedFetchSuggestions(value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault(); // エンターキーでの改行をキャンセル
                              }
                            }}
                            placeholder="例：新宿駅"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* オートコンプリートのドロップダウンリストのスタイリングを修正 */}
                <div
                  style={{
                    left: 0,
                    right: 0,
                    zIndex: 1,

                    boxShadow: '1px 1px 8px 1px rgba(0, 0, 0, 0.09)',
                    marginLeft: '20px',
                    marginRight: '20px',

                    borderRadius: '8px', // box自体の角の丸み
                  }}
                >
                  <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                    {points &&
                      points.map((point, index) => (
                        <div
                          style={{height: '40px', padding: '10px 0 0 10px'}}
                          role="button"
                          tabIndex={index}
                          key={index}
                          onClick={() => {
                            handleSearchTop(point.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              setKeyword(point.name);
                            }
                          }}
                        >
                          {point.name}({point.lineName})
                          <div
                            style={{
                              marginTop: '3%',
                              marginBottom: '1.5rem',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              width: '97%',
                              height: '0.5px',
                              background: '#EDEDED',
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </Grid>
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
            onClick={handleSearch}
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
export default memo(StartPointSetModal);

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);
const inputDivStyle = css({
  marginTop: '6px',
  border: '#eee 3px solid',
  borderRadius: '8px', // box自体の角の丸み
  marginLeft: '20px',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center', // 縦方向の位置を中央に
});

const inputStyle = css({
  marginRight: '13px',
  paddingLeft: '10px',
  height: '48px',

  fontWeight: 'semibold',
  fontSize: '0.91rem', // 地域の文字の大きさ
  _placeholder: {
    color: '#808080',
    fontWeight: 'semibold',
  },
  _focus: {
    outline: 'none',
  },
});
