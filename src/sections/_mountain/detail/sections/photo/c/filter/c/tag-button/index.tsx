import {memo} from 'react';
import Iconify from 'src/components/iconify/Iconify';
import {useModalState} from 'src/components/provider/modalStateStore';
import {css} from 'styled-system/css';
import {PrefectureSearchModal} from './c/modal';

function AreaButton() {
  const {openModal} = useModalState();
  function handleKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
    // Enterキーが押されたときのみ処理を実行する
    if (e.key === 'Enter') {
      openModal('HomeButtonGroup');
    }
  }

  return (
    <>
      <PrefectureSearchModal />
      <div className={buttonDivStyleCommon}>
        <a
          className={buttonStyle}
          onClick={() => openModal('HomeButtonGroup')}
          onKeyDown={handleKeyDown}
          role="button" // role属性を追加しておくと良いでしょう
          tabIndex={0} // tabIndexを追加することで、キーボード操作を可能にします
        >
          <div>
            <span
              className={css({
                fontSize: '0.91rem', // 地域の文字の大きさ
                marginTop: '3px', // 地域が真ん中に来るように調整
                color: '#367b9d', // 地域の文字色
                marginLeft: '10px', // 地域の左の余白
                fontWeight: 'semibold', // 地域の文字の太さ
              })}
            >
              タグ
            </span>
            <span
              className={css({
                fontSize: '0.9rem', // 地域の文字の大きさ
                marginTop: '3px', // 真ん中に来るように調整
                color: '#808080', // 文字色
                marginLeft: '14px', // 左の余白
                fontWeight: 'semibold', // 文字の太さ
              })}
            >
              選択する
            </span>
          </div>
          <div className={css({justifyContent: 'space-between', marginRight: '13px'})}>
            <Iconify icon="clarity:plus-circle-solid" sx={{width: 22, height: 22}} color="#367b9d" />
          </div>
        </a>
      </div>
    </>
  );
}

export default memo(AreaButton);

const buttonDivStyleCommon = css({
  marginLeft: '20px', // box自体の左の余白
  marginRight: '2px', // box自体の右の余白
  marginTop: '7px',
  border: '#eee 3px solid',
  borderRadius: '8px', // box自体の角の丸み
  backgroundColor: 'white', // box自体の背景色,グレーなので
});

const buttonStyle = css({
  display: 'flex',
  alignItems: 'center', // 縦方向の位置を中央に
  justifyContent: 'space-between',

  height: '48px',
  transition: 'background-color 0.3s ease-in-out', // 追加のスタイル：トランジションの定義

  '&:active': {
    backgroundColor: '#e5e5e5', // 追加のスタイル：アクティブ時の背景色
  },
});
