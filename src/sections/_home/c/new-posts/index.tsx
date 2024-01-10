import {css} from 'styled-system/css';
import {memo} from 'react';
import PostList from './c/post-list';

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
          みんなの活動
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
          知ってる情報をシェアしよう
        </div>
      </div>

      <PostList />
    </>
  );
}
export default memo(NewPostList);
