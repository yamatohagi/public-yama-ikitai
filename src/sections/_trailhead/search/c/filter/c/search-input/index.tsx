import {IconButton} from '@mui/material';
import {memo, useRef} from 'react';
import Iconify from 'src/components/iconify';
import {useTrailheadFilterStore} from 'src/components/provider/trailheadFilterStore';
import {css} from 'styled-system/css';

function SearchInput() {
  const {liveState, applyFilters} = useTrailheadFilterStore();
  const [value, setValue] = liveState('searchInput');

  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    setValue('', '');
  };

  return (
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
          キーワード
        </span>
      </div>
      <form
        style={{width: '60%'}}
        action="/"
        onSubmit={(e) => {
          e.preventDefault(); // フォームのデフォルトの送信動作をキャンセル
          if (inputRef.current) {
            inputRef.current.blur();
          }
          setValue(value, value);
          applyFilters();
        }}
      >
        <input
          ref={inputRef}
          className={inputStyle}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value, e.target.value)}
          placeholder="山名・地名・ワードで検索"
        />
      </form>
      <IconButton className={css({justifyContent: 'space-between'})} onClick={clearInput}>
        <Iconify icon="basil:cross-outline" sx={{width: 22, height: 22, marginRight: '5px'}} color="#636363" />
      </IconButton>
    </div>
  );
}

export default memo(SearchInput);

const inputDivStyle = css({
  marginTop: '6px',
  border: '#eee 3px solid',
  borderRadius: '8px', // box自体の角の丸み
  backgroundColor: 'white',
  marginLeft: '20px',
  marginRight: '20px',
  display: 'flex',
  alignItems: 'center', // 縦方向の位置を中央に
  justifyContent: 'space-between',
});

const inputStyle = css({
  justifyContent: 'flex-end',
  backgroundColor: 'white',
  marginRight: '0px',
  paddingLeft: '10px',
  textAlign: 'left',
  width: '100%',
  height: '48px',
  transition: 'background-color 0.3s ease-in-out', // 追加のスタイル：トランジションの定義
  borderRadius: '8px',
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
