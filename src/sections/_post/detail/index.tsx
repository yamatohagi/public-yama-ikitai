import {useRouter} from 'next/router';
import {useModal} from 'src/hooks/useModal';
import Modal from 'src/components/Modal';
import UserInfoSimple from './c/user-info-simple';
import PostImages from './c/post-images';
import PostImageAction from './c/post-image-action';
import PostHashTags from './c/post-hash-tags';
import PostInfo from './c/post-info';
import UserInfoSimpleSkeleton from './c/user-info-simple/skeleton';
import PostCreateModalInner from './c/edit-modal-inner';
import {PostDetailGet} from './api';

export const PostDetail = () => {
  const {openModal: postEditOpenModal, isOpen: postEditModalIsOpen, closeModal: postEditCloseModal} = useModal({});
  // idを取得する
  const router = useRouter();
  const {id, initialSlideIdx} = router.query; // もしinitialSlideIdxがあれば、そのindexに飛ばす

  // todo:サーバーで撮った方がいいか調べる
  const {data} = PostDetailGet();
  const post = data || undefined;
  const user = data ? data?.User : undefined;
  const mountain = data ? data?.Mountain : undefined;
  const photos = data?.Photo;
  const hashTags = data?.PostToHashtag.map((postToHashTag) => postToHashTag.Hashtag);

  return (
    <>
      {/* Post編集モーダル */}
      {postEditModalIsOpen && (
        <Modal open onClose={() => {}} dialogProps={{fullWidth: true}} width="95%">
          <PostCreateModalInner refresh={() => {}} closeModal={postEditCloseModal} />
        </Modal>
      )}

      {/* ユーザー情報(プロフ、名前、てんてんてん) */}
      {user ? <UserInfoSimple user={user} mountain={mountain} editModalOpen={postEditOpenModal} /> : <UserInfoSimpleSkeleton />}

      <PostImages images={photos} initialSlideIdx={Number(initialSlideIdx)} />
      {id && <PostImageAction postId={Number(id)} />}
      <PostHashTags hashTags={hashTags} />
      <PostInfo post={post} />
    </>
  );
};
