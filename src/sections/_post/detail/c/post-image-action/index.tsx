import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Prisma} from '@prisma/client';
import Iconify from 'src/components/iconify/Iconify';
import {css} from 'styled-system/css';
import {useModalState} from 'src/components/provider/modalStateStore';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {useBookmarkApiMutation, useLikeApiMutation, useLikeApiQuery, usePostBookmarkApiQuery} from './api';

type PostImageActionProps = {
  images?: Prisma.PhotoGetPayload<{}>[];
  postId: number;
};

const PostImageAction: React.FC<PostImageActionProps> = ({images, postId}: PostImageActionProps) => {
  const {data: session} = useSession();
  const router = useRouter();
  const userId = session?.user?.id;
  const {postLikes} = useLikeApiQuery(postId, userId);
  const {postBookmarks} = usePostBookmarkApiQuery(postId, userId);
  const {createOne, deleteOne} = useLikeApiMutation(postId, userId);
  const {createOne: createOneBm, deleteOne: deleteOneBm} = useBookmarkApiMutation(postId, userId);
  const {openModal} = useModalState();

  const handleLike = (event: any) => {
    if (!userId) {
      // ログインページに飛ばす
      router.push(paths.login.path);
      return;
    }
    event.preventDefault();
    if (postLikes) {
      deleteOne.mutate({where: {postId, userId}});
    } else {
      createOne.mutate({data: {postId, userId}});
    }
  };

  const handleBookmark = (event: any) => {
    if (!userId) {
      // ログインページに飛ばす
      router.push(paths.login.path);
      return;
    }
    event.preventDefault();
    if (postBookmarks) {
      deleteOneBm.mutate({where: {postId, userId}});
    } else {
      createOneBm.mutate({data: {postId, userId}});
    }
  };

  return (
    <div className={css({display: 'flex', justifyContent: 'space-between'})}>
      <div className={css({display: 'flex', mt: 2})}>
        <button type="button" onClick={handleLike}>
          {/* iconify */}
          {postLikes ? (
            <div className={css({color: '#FE374F'})}>
              <Iconify icon="mdi:heart" sx={{width: 27, height: 27, ml: 1.5, mt: 0.2}} />
            </div>
          ) : (
            <div className={css({color: '#323232'})}>
              <Iconify icon="mdi:heart-outline" sx={{width: 27, height: 27, ml: 1.5, mt: 0.2}} />
            </div>
          )}
        </button>
        <button type="button" className={css({color: '#323232'})} onClick={() => openModal('PostCommentModal')}>
          <Iconify icon="iconamoon:comment" sx={{width: 27, height: 27, ml: 1.5}} />
        </button>
      </div>

      <div className={css({display: 'flex', mt: 2})}>
        <button type="button" className={css({color: '#323232'})} onClick={handleBookmark}>
          {postBookmarks ? (
            <Iconify icon="material-symbols:bookmark" sx={{width: 27, height: 27, mr: 1.5}} />
          ) : (
            <Iconify icon="material-symbols:bookmark-outline" sx={{width: 27, height: 27, mr: 1.5}} />
          )}
        </button>
      </div>
    </div>
  );
};
export default PostImageAction;
