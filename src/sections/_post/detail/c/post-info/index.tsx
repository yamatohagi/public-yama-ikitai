import React from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {css} from 'styled-system/css';
import {useModalState} from 'src/components/provider/modalStateStore';
import {timeAgo} from 'src/utils/formatTime';
import {contentToText} from 'server/functions/etc';
import PostInfoSkeleton from './skeleton';
import CommentModal from './c/ comment-modal';
import type {PostDetailGet} from '../../api';

type PostInfoProps = {
  post?: NonNullable<ReturnType<typeof PostDetailGet>['data']>;
};

const PostInfo: React.FC<PostInfoProps> = ({post}: PostInfoProps) => {
  const {openModal} = useModalState();
  if (!post) {
    return <PostInfoSkeleton />;
  }

  return (
    <>
      <CommentModal />
      <div className={css({ml: '1rem', mt: '0.5rem', fontSize: '0.9rem'})}>
        <div>{contentToText(post.content)}</div>
        {post.Replies.length > 0 && (
          <button type="button" className={css({color: '#808080', mt: '0.5rem'})} onClick={() => openModal('PostCommentModal')}>
            {`コメント${post.Replies.length}件を見る`}
          </button>
        )}
        <div className={css({fontSize: '0.8rem', color: '#808080', mt: '1rem'})}>{timeAgo(post.createdAt)}</div>
      </div>
    </>
  );
};

export default PostInfo;
