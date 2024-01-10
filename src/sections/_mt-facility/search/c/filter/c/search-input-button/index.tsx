import {memo} from 'react';
import Iconify from 'src/components/iconify/Iconify';
import {useMtFacilityFilterStore} from 'src/components/provider/mtFacilityFilterStore';
import {css} from 'styled-system/css';

function SearchInputButton() {
  const {applyFilters} = useMtFacilityFilterStore();

  return (
    <div className={divStyle} style={{marginBottom: '6px'}}>
      <button type="button" className={searchButtonStyle} onClick={() => applyFilters()}>
        <Iconify icon="iconamoon:search-light" sx={{width: 24, height: 24, marginRight: '7px', paddingBottom: '2px'}} />
        <div>検索</div>
      </button>
    </div>
  );
}

export default memo(SearchInputButton);

const divStyle = css({
  marginTop: '7px',
  marginLeft: '20px',
  marginRight: '20px',
});

const searchButtonStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  color: 'white',
  fontWeight: 'semibold',
  fontSize: '15px',
  backgroundColor: '#FA541C',
  textAlign: 'center',
  width: '100%',
  height: '43px',
  transition: 'background-color 0.3s ease-in-out', // 追加のスタイル：トランジションの定義
});
