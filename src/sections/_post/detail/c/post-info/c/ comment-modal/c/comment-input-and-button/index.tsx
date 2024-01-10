import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useRef} from 'react';
import {useGlobalState} from 'src/components/provider/useGlobalStore';
import {useFocusStore} from 'src/components/provider/useFocusStore';
import {usePostCreateOneM} from 'src/sections/_post/detail/c/post-info/c/ comment-modal/c/comment-input-and-button/mutations';
import {css} from 'styled-system/css';
import {useSession} from 'next-auth/react';

export const CommentInputAndButton = () => {
  const {data: session} = useSession();
  const user = session?.user;

  const postId = useRouter().query.id?.toString() || '';
  const [value, setValue] = useGlobalState('commentPostInput', '');
  const inputRef = useRef<HTMLInputElement>(null);
  const {shouldFocus, resetFocus, focusProps} = useFocusStore();

  /* api */
  const targetPostId = focusProps?.parentId ? Number(focusProps.parentId) : Number(postId);
  const {handlePost} = usePostCreateOneM(targetPostId, resetFocus);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus, resetFocus, focusProps]);

  return (
    <div className={css({mt: 2, mb: 2})}>
      {focusProps && (
        <div
          className={css({
            mt: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 14,
            backgroundColor: '#f0f0f0',
            color: '#808080',
          })}
        >
          <span>{focusProps.parentName}に返信しています</span>

          <button className={css({mr: 3, fontSize: 20})} type="button" onClick={resetFocus}>
            ×
          </button>
        </div>
      )}
      <div className={css({display: 'flex', justifyContent: 'space-between', alignItems: 'center'})}>
        <Image
          alt="User Icon"
          src={user?.image || '/images/500.png'}
          className={css({borderRadius: '50%', ml: 2})}
          width={50} // Set the width you want here
          height={50} // This will keep the aspect ratio intact
        />

        <input ref={inputRef} className={inputStyle} value={value} onChange={(e) => setValue(e.target.value)} placeholder="コメントを入力" />
        <button
          type="button"
          style={{color: value === '' ? '#808080' : '#367b9d', marginRight: 10, fontWeight: '500'}}
          onClick={(e) => handlePost({value, setValue})}
          disabled={value === ''}
        >
          投稿
        </button>
      </div>
    </div>
  );
};

const inputStyle = css({
  mr: 1,
  border: '#eee 3px solid',

  paddingLeft: '10px',
  textAlign: 'left',
  width: '70%',
  height: '48px',

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
