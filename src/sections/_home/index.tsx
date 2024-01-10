import React, {useState, useEffect} from 'react';
import {css} from 'styled-system/css';
import Image from 'next/image';
import Iconify from 'src/components/iconify/Iconify';
import {useAuth} from 'src/hooks/use-auth';
import RecommendMtList from './c/mt-list';
import HomeButtonGroup from './c/home-button-group/HomeButtonGroup';
import SearchButtonWithInput from './c/etc-search/SearchButtonWithInput';
import NewMediaPostList from './c/new-media-posts';
import NewPostList from './c/new-posts';

const images = ['/assets/images/home/tubakuro.jpg', `/assets/images/home/star.jpg`, '/assets/images/home/snow.jpg', '/assets/images/home/tree.jpg'];

function HomeView() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [key, setKey] = useState(0);

  useAuth();

  useEffect(() => {
    // アイコンの
    const timer = setInterval(() => {
      setKey((prevKey) => prevKey + 1); // ここでstateを更新することで、アイコンが再描画されます
    }, 3000); // 1000ミリ秒（1秒）ごとに再描画

    return () => clearInterval(timer); // コンポーネントがアンマウントされる時にタイマーをクリア
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 5000); // 画像を5秒ごとに切り替える

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  const homeViewStyle = css({
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  });

  const overlayStyle = css({
    background: 'rgba(24, 75, 101, 0.89)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1, // 画像の上に配置する
  });

  return (
    <>
      <div className={homeViewStyle}>
        {images.map((src, index) => (
          <Image
            unoptimized
            key={src}
            src={src}
            alt=""
            fill
            style={{
              objectFit: 'cover',
              position: 'absolute',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
            quality={100}
          />
        ))}
        <div className={overlayStyle} />
        {/* //svgを追加 */}
        <Image
          className={css({
            position: 'absolute',
            top: '16%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          })}
          alt="500"
          unoptimized
          src="/assets/home/sub-title.svg"
          width={350}
          height={75}
          style={{width: '93%', height: 'auto'}}
          priority
        />
        <Image
          className={css({
            position: 'absolute',
            top: '31%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          })}
          alt="500"
          unoptimized
          src="/assets/home/title.svg"
          width={200}
          height={75}
          style={{width: '63%', height: 'auto'}}
          priority
        />

        <HomeButtonGroup />
        <div
          className={css({
            position: 'absolute',
            top: '57%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', // ← 'inline-flex'から'flex'に変更
            // 左から10ピクセルのいちに配置

            width: '328px',

            zIndex: 2,
          })}
        >
          <SearchButtonWithInput />
        </div>

        <div
          className={css({
            position: 'absolute',
            top: '69%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', // ← 'inline-flex'から'flex'に変更

            width: '328px',

            zIndex: 2,
          })}
        >
          <button
            type="button"
            className={css({
              flexGrow: 10,
              height: '55px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 'semibold',
              fontSize: '15px',
              backgroundColor: 'none',
              border: '3px solid #FFF',
              backdropFilter: 'none',
              display: 'flex', // ボタン内の要素を中央に配置するために追加
              alignItems: 'center', // ボタン内の要素を中央に配置するために追加
              justifyContent: 'center', // テキストとアイコンを水平方向に中央揃え
            })}
          >
            <Iconify icon="mdi:map-marker" width={24} style={{verticalAlign: 'middle', marginRight: 7}} />
            {/* 垂直方向の配置を調整 */}
            現在地から探す
          </button>
        </div>
        <div
          className={css({
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            bottom: '0%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', // ← 'inline-flex'から'flex'に変更
            color: 'white',

            fontWeight: 'bold',
            zIndex: 2,
          })}
        >
          <Iconify icon="line-md:construction" width={22} style={{verticalAlign: 'middle', marginRight: 7}} key={key} />
          {/* 垂直方向の配置を調整 */}
          キャラクター募集中
        </div>
        {/* <Button className={buttonStyle}>Click me</Button> */}
      </div>
      <div
        className={css({
          position: 'relative',
          backgroundColor: '#F5F5F5',
          height: '120px',
        })}
      >
        <div
          className={css({
            position: 'absolute', // 子divを絶対配置します
            bottom: 8,
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            width: '100%', // 全幅を確保します
          })}
        >
          おすすめの山
        </div>
        <div
          className={css({
            position: 'absolute', // 子divを絶対配置します
            bottom: 2,
            textAlign: 'center',
            fontSize: '16px',

            width: '100%', // 全幅を確保します
          })}
        >
          距離や時間を考慮しておすすめの山を表示
        </div>
      </div>
      <RecommendMtList />
      <NewMediaPostList />
      <NewPostList />
    </>
  );
}

export default HomeView;
// todo:山を探してみるというボタンを作る(オレンシで目立つやつ、導線)
