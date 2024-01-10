import {css} from 'styled-system/css';
import {memo} from 'react';
import PostMediaList from './c/post-media-list';

function NewPostList() {
  return (
    <>
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
          みんなの投稿
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
          山に行った記録や口コミを残してみよう
        </div>
      </div>

      <PostMediaList />
    </>
  );
}
export default memo(NewPostList);
