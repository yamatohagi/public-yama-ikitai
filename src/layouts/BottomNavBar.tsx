/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// BottomNavBar.tsx
import {css} from 'styled-system/css';
import Iconify from 'src/components/iconify/Iconify';
import {memo} from 'react';
import {paths} from 'src/routes/paths';
import {useRouter} from 'next/router';
import Link from 'next/link';

const navBarStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  maxWidth: '600px',
  width: '100%',
  height: '60px',
  paddingBottom: '5px',
  zIndex: 2,
  color: '205676',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // 半透明な白色
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
});

const navItemStyle = css({
  textAlign: 'center',
  WebkitTapHighlightColor: 'transparent',
});

const BottomNavBar = () => {
  const router = useRouter();

  const iconDivStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    height: '32px',
  });

  return (
    <div className={navBarStyle}>
      {/* ホーム */}
      <Link
        prefetch={false}
        shallow={false}
        href="/"
        className={css({
          textAlign: 'center',
          WebkitTapHighlightColor: 'transparent',
        })}
      >
        <div>
          <div className={iconDivStyle}>
            <Iconify
              icon={router.pathname === '/' ? 'majesticons:home' : 'majesticons:home-line'}
              className={css({
                transition: 'width 0.04s ease',
                color: '#205676',
                width: '30px',
                height: '30px',
                '&:active': {
                  width: '26px',
                  height: '26px',
                },
              })}
            />
          </div>
          <div className={css({fontSize: '8px', color: '#205676', fontWeight: 'semibold', marginTop: 'auto'})}> ホーム </div>
        </div>
      </Link>
      {/* 投稿 */}
      <Link prefetch={false} shallow={false} href={`${paths.post.index.path}?tab=media`} className={navItemStyle}>
        <div>
          <div className={iconDivStyle}>
            <Iconify
              icon={
                router.pathname.includes(`${paths.post.index.path}`)
                  ? 'material-symbols-light:view-comfy-alt-rounded'
                  : 'material-symbols:view-cozy-outline-rounded'
              }
              className={css({
                transition: 'width 0.04s ease',
                color: '#205676',
                width: '28px',
                height: '28px',
                '&:active': {
                  width: '26px',
                  height: '26px',
                },
              })}
            />
          </div>
          <div className={css({fontSize: '8px', color: '#205676', fontWeight: 'semibold', marginTop: 'auto'})}>投稿</div>
        </div>
      </Link>
      {/* 山をさがす */}
      <Link href={paths.mountain.index.path} prefetch={false} shallow={false} className={navItemStyle}>
        <div>
          {router.pathname.includes(paths.mountain.index.path) ? (
            // アイコンを表示
            <div>
              <div className={iconDivStyle}>
                <Iconify
                  icon="foundation:mountains"
                  className={css({
                    transition: 'width 0.04s ease',
                    color: '#205676',
                    width: '30px',
                    height: '30px',
                    '&:active': {
                      width: '26px',
                      height: '26px',
                    },
                  })}
                />
              </div>
              <div className={css({fontSize: '8px', color: '#205676', fontWeight: 'semibold', marginTop: 'auto'})}>さがす</div>
            </div>
          ) : (
            // 画像を表示
            <div>
              <div className={iconDivStyle}>
                <img
                  alt="icon"
                  src="/assets/icons/three-value-check/mtimage.svg"
                  className={css({
                    transition: 'width 0.04s ease',
                    color: '#205676',
                    width: '30px',
                    height: '30px',
                    '&:active': {
                      width: '26px',
                      height: '26px',
                    },
                  })}
                />
              </div>
              <div className={css({fontSize: '8px', color: '#205676', fontWeight: 'semibold', marginTop: 'auto'})}>さがす</div>
            </div>
          )}
        </div>
      </Link>
      {/* 通知 */}
      <Link href={paths.notice.path} prefetch={false} shallow={false} className={navItemStyle}>
        <div>
          <div className={iconDivStyle}>
            <Iconify
              icon={router.pathname.includes(paths.notice.path) ? 'mdi:bell' : 'mdi:bell-outline'}
              className={css({
                transition: 'width 0.04s ease',
                color: '#205676',
                width: '26px',
                height: '26px',
                '&:active': {
                  width: '22px',
                  height: '22px',
                },
              })}
            />
          </div>
          <div className={css({fontSize: '8px', color: '#205676', fontWeight: 'semibold', marginTop: 'auto'})}>通知</div>
        </div>
      </Link>
      {/* マイページ */}
      <Link href={paths.user.maypage.path} prefetch={false} shallow={false} className={navItemStyle}>
        <div>
          <div className={iconDivStyle}>
            <Iconify
              icon={router.pathname.includes('mypage') ? 'mdi:account' : 'mdi:account-outline'}
              className={css({
                transition: 'width 0.04s ease',
                color: '#205676',
                width: '30px',
                height: '30px',
                '&:active': {
                  width: '26px',
                  height: '26px',
                },
              })}
            />
          </div>
          <div className={css({fontSize: '8px', color: '#205676', fontWeight: 'semibold', marginTop: 'auto'})}>マイページ</div>
        </div>
      </Link>
    </div>
  );
};

export default memo(BottomNavBar);
