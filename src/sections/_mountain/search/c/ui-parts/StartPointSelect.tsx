import {memo, useEffect, useState} from 'react';
import Iconify from 'src/components/iconify/Iconify';
import {useModalState} from 'src/components/provider/modalStateStore';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';
import {css} from 'styled-system/css';

function StartPointSelect() {
  const [mtSearchSetting] = useMtSearchSetting();
  const {openModal} = useModalState();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(mtSearchSetting.from.label);
  }, [mtSearchSetting]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
    // Enterキーが押されたときのみ処理を実行する
    if (e.key === 'Enter') {
      openModal('StartPointSetModal');
    }
  }

  return (
    <div
      className={css({
        marginLeft: '20px', // box自体の左の余白
        marginRight: '2px', // box自体の右の余白
        marginTop: '7px',
        border: '#eee 3px solid',
        borderRadius: '8px', // box自体の角の丸み
        backgroundColor: 'white', // box自体の背景色,グレーなので
      })}
    >
      <a
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center', // 縦方向の位置を中央に
          height: '48px',
          transition: 'background-color 0.3s ease-in-out', // 追加のスタイル：トランジションの定義
          '&:active': {
            backgroundColor: '#e5e5e5', // 追加のスタイル：アクティブ時の背景色
          },
        })}
        onClick={() => openModal('StartPointSetModal')}
        onKeyDown={handleKeyDown}
        role="button" // role属性を追加しておくと良いでしょう
        tabIndex={0} // tabIndexを追加することで、キーボード操作を可能にします
      >
        <div
          style={{
            alignItems: 'baseline',
            display: 'flex',
            width: '78%',
          }}
        >
          <span
            style={{
              fontSize: getFontSize(`${value}`),
            }}
            className={css({
              color: '#367b9d',
              marginLeft: '10px',
              fontWeight: 'semibold',
              minWidth: '35px',
            })}
          >
            出発地
          </span>

          <div
            className={css({
              textAlign: 'center',
              alignItems: 'center',
              marginLeft: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              flex: 1, // 追加: 親の div 要素の残りのスペースを使用
            })}
          >
            <span
              style={{
                fontSize: getFontSize(`${value}`),
              }}
              className={css({
                fontWeight: 'semibold',
              })}
            >
              {value}
            </span>
          </div>
        </div>
        <div className={css({marginRight: '14px', flexShrink: 0, justifyContent: 'flex-end'})}>
          <Iconify icon="clarity:plus-circle-solid" sx={{width: 22, height: 22}} color="#367b9d" />
        </div>
      </a>
    </div>
  );
}

export default memo(StartPointSelect);

// const buttonDivStyleCommon = css({
//   marginLeft: '20px', // box自体の左の余白
//   marginRight: '2px', // box自体の右の余白
//   marginTop: '7px',
//   border: '#eee 3px solid',
//   borderRadius: '8px', // box自体の角の丸み
//   backgroundColor: 'white', // box自体の背景色,グレーなので
// });

// const buttonStyle = css({
//   display: 'flex',
//   alignItems: 'center', // 縦方向の位置を中央に
//   justifyContent: 'space-between',

//   height: '48px',
//   transition: 'background-color 0.3s ease-in-out', // 追加のスタイル：トランジションの定義

//   '&:active': {
//     backgroundColor: '#e5e5e5', // 追加のスタイル：アクティブ時の背景色
//   },
// });

const getFontSize = (str: string) => {
  const {length} = str;

  if (length <= 4) {
    return '0.90rem';
  }
  if (length <= 5) {
    return '0.85rem';
  }
  if (length <= 8) {
    return '0.7rem';
  }
  return '0.6rem'; // 20文字以上の場合
};

/* <div>
              <span
                className={css({
                  fontSize: '0.91rem', // 地域の文字の大きさ
                  marginTop: '3px', // 地域が真ん中に来るように調整
                  color: '#367b9d', // 地域の文字色
                  marginLeft: '10px', // 地域の左の余白
                  fontWeight: 'semibold', // 地域の文字の太さ
                })}
              >
                出発地
              </span>
              <span
                className={css({
                  fontSize: '0.9rem', // 地域の文字の大きさ
                  marginTop: '3px', // 真ん中に来るように調整
                  color: '#757575', // 文字色
                  marginLeft: '14px', // 左の余白
                  fontWeight: 'semibold', // 文字の太さ
                })}
              >
                選択する
              </span>
            </div>
            <div className={css({ justifyContent: 'space-between', marginRight: '13px' })}>
              <Iconify
                icon="clarity:plus-circle-solid"
                sx={{ width: 22, height: 22 }}
                color="#367b9d"
              />
            </div> */
