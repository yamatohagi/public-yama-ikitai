import {Icon, IconButton, Link} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {FindManyRepliesType, NestedReplyType} from 'server/routers/post/type';
import {useFocusStore} from 'src/components/provider/useFocusStore';
import {usePostCreateOneM} from 'src/sections/_post/detail/c/post-info/c/ comment-modal/c/comment-input-and-button/mutations';

import {css} from 'styled-system/css';
import NextLink from 'next/link';
import {paths} from 'src/routes/paths';
import {timeAgo} from 'src/utils/formatTime';
import {alertThenExecute} from 'server/functions/etc';
import {useAuth} from 'src/hooks/use-auth';
import Iconify from 'src/components/iconify/Iconify';
import {RemoveReply} from './api';

type CommentItemProps = {
  comment: FindManyRepliesType['Replies'][0];
};
const CommentItem = ({comment}: CommentItemProps) => {
  const postId = useRouter().query.id?.toString() || '';
  const currentUserId = useAuth().userId;
  const {handlePost} = usePostCreateOneM(Number(postId));
  const removeReply = RemoveReply();

  function hReplay({parentId, parentName}: {parentId: number; parentName: string}) {
    useFocusStore.getState().triggerFocus({parentId, parentName});
  }

  const [isVisible, setIsVisible] = useState(false);
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleRemove = (id: number) => {
    removeReply.mutate({id: Number(id)});
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50px auto', // アイコンとその他の項目を横並びに
          gridTemplateRows: 'auto',
          margin: '0.5rem',
          gap: '10px', // アイコンとコンテンツ部分の間隔
          alignItems: 'start',
        }}
      >
        {/* 多分これキャッシュの時にUserがなくなる2023/10/26投稿時にエラー起きてたから?つけた */}
        <Link component={NextLink} href={`${paths.user.index.path}/${comment.User?.id}`} color="inherit" underline="none">
          <div className={css({mt: '0.5rem', width: '47px', height: '47px', borderRadius: '50%'})}>
            <Image
              className={css({borderRadius: '50%'})}
              unoptimized
              src={comment.User?.image || '/assets/images/un.webp'}
              alt="icon"
              width={40}
              height={40}
            />
          </div>
        </Link>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around', // 項目が縦に均等に分布
          }}
        >
          <div style={{display: 'flex'}}>
            <div className={css({fontSize: 12})}>{comment.User?.name || 'ゲスト'}</div>
            <div className={css({ml: '1rem', fontSize: 12, color: '#808080'})}>{comment.createdAt && timeAgo(comment.createdAt)}</div>
          </div>
          <div style={{display: 'flex'}}>
            <div className={css({fontSize: 15})}>{comment.content} </div>

            {/* 削除ボタン */}
            <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
              {currentUserId === comment.userId && (
                <IconButton onClick={() => alertThenExecute(() => handleRemove(comment.id), '本当に削除しますか？')} sx={{}}>
                  <Iconify icon="basil:cross-outline" width="30px" sx={{color: '#808080'}} />
                </IconButton>
              )}
            </div>
          </div>
          <div style={{display: 'flex'}}>
            {comment.status === 'success' && (
              <button type="button" onClick={() => hReplay({parentId: comment.id, parentName: comment.User?.name || 'ゲスト'})}>
                <div
                  className={css({
                    fontSize: 12,
                    color: '#808080',
                    // fontWeight: 'bold',//
                  })}
                >
                  返信
                </div>
              </button>
            )}

            {comment.status === 'posting' && <div>投稿中...</div>}
            {comment.status === 'error' && (
              <button type="button" onClick={() => handlePost({tempId: comment.id})}>
                リトライ
              </button>
            )}

            <button type="button" onClick={handleToggleVisibility}>
              {comment.Replies?.length > 0 && (
                <div className={css({ml: 7, fontSize: 12, color: '#808080'})}>
                  {isVisible ? 'ー返信を非表示にする' : `ー他${comment.Replies?.length}件の返信を見る`}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      {isVisible && (
        <div>
          {comment.Replies?.map((subComment: NestedReplyType) => (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '50px 50px auto', // アイコンとその他の項目を横並びに
                gridTemplateRows: 'auto',
                margin: '0.5rem',
                gap: '10px', // アイコンとコンテンツ部分の間隔
                alignItems: 'start',
              }}
            >
              <div className={css({gridColumn: '2/3'})}>
                <Link component={NextLink} href={`${paths.user.index.path}/${comment.User.id}`} color="inherit" underline="none">
                  <div className={css({mt: '0.5rem', width: '47px', height: '47px', borderRadius: '50%'})}>
                    <Image
                      className={css({borderRadius: '50%'})}
                      unoptimized
                      src={subComment.User?.image || '/assets/images/un.webp'}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                  </div>
                </Link>
              </div>
              <div key={subComment.id}>
                <div style={{display: 'flex'}}>
                  <div className={css({fontSize: 12})}>{subComment.User?.name}</div>
                  <div className={css({ml: '1rem', fontSize: 12, color: '#808080'})}>{timeAgo(comment.createdAt)}</div>
                </div>
                <div style={{display: 'flex'}}>
                  <div className={css({fontSize: 15})}>{subComment.content}</div>
                  {/* 削除ボタン */}
                  <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                    {currentUserId === subComment.userId && (
                      <IconButton onClick={() => alertThenExecute(() => handleRemove(subComment.id), '本当に削除しますか？')}>
                        <Iconify icon="basil:cross-outline" width="30px" sx={{color: '#808080'}} />
                      </IconButton>
                    )}
                  </div>
                </div>
                {subComment.status === 'success' && (
                  <button type="button" onClick={() => hReplay({parentId: comment.id, parentName: subComment.User?.name || 'ゲスト'})}>
                    <div
                      className={css({
                        fontSize: 12,
                        color: '#808080',
                        // fontWeight: 'bold',//
                      })}
                    >
                      返信
                    </div>
                  </button>
                )}
                {subComment.status === 'posting' && <div>投稿中...</div>}
                {subComment.status === 'error' && (
                  <button type="button" onClick={() => handlePost({tempId: subComment.id})}>
                    リトライ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentItem;
