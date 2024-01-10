import React from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Prisma} from '@prisma/client';
import Typography from '@mui/material/Typography';
import SlideInModal from 'src/components/modal/bottom-slide-in-modal';
import {CommentInputAndButton} from './c/comment-input-and-button';
import CommentItems from './c/comment-items';

type PostInfoProps = {
  post?: Prisma.PostGetPayload<{include: {User: true}}>;
};

const CommentModal: React.FC<PostInfoProps> = () => (
  <SlideInModal
    modalOpenStateKey="PostCommentModal"
    topComponent={
      <Typography id="modal-title" variant="h6" component="div" textAlign="center" sx={{mb: 1.8}}>
        コメント
      </Typography>
    }
    mainComponent={<CommentItems />}
    bottomComponent={<CommentInputAndButton />}
  />
);
export default CommentModal;
