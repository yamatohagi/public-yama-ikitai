import React, {Fragment} from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Prisma} from '@prisma/client';
import {useRouter} from 'next/router';
import CommentItem from './c/item';
import GetReply from './api';

type PostInfoProps = {
  post?: Prisma.PostGetPayload<{include: {User: true}}>;
};

const CommentItems: React.FC<PostInfoProps> = () => {
  const postId = useRouter().query.id?.toString() || '';

  /* api */
  const {data} = GetReply(Number(postId));

  let replies;
  if (data) {
    replies = data.Replies;
  }

  return (
    <>
      {replies?.map((reply, i) => (
        <Fragment key={i}>
          <CommentItem comment={reply} />
        </Fragment>
      ))}
    </>
  );
};

export default CommentItems;
