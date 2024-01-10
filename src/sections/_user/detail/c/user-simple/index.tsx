import Image from 'next/image';
import {css} from 'styled-system/css';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {useAuth} from 'src/hooks/use-auth';
import {useModal} from 'src/hooks/useModal';
import {alertThenExecute} from 'server/functions/etc';
import Modal from 'src/components/Modal';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify/Iconify';
import {UserDetailGetGetResultType, useFollowApiMutation, useFollowApiQuery} from './api';
import UserEditModalInner from './c/edit-modal';
import UserSettingModalInner from './c/setting-modal';

type UserInfoSimpleProps = {
  user: UserDetailGetGetResultType;
};
const UserInfoSimple = ({user}: UserInfoSimpleProps) => {
  const {userId: currentUserId, loginCheck} = useAuth();
  const {data: session} = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const {follow} = useFollowApiQuery(user.id, userId);
  const {createOne, deleteOne} = useFollowApiMutation(user.id, userId);
  const {openModal: userEditOpenModal, isOpen: userEditIsOpen, closeModal: userEditCloseModal} = useModal({});
  const {openModal: userSettingOpenModal, isOpen: userSettingIsOpen, closeModal: userSettingCloseModal} = useModal({});

  const handleLike = (event: any) => {
    event.preventDefault();

    if (!userId) {
      // ログインページに飛ばす
      router.push(paths.login.path);

      return;
    }

    if (follow) {
      deleteOne.mutate({where: {followingId: user.id, followerId: userId}});
    } else {
      createOne.mutate({data: {followingId: user.id, followerId: userId}});
    }
  };

  return (
    <>
      {/* プロフィール編集Modal */}
      {userEditIsOpen && (
        <Modal open onClose={() => alertThenExecute(userEditCloseModal)} dialogProps={{fullWidth: true}} width="95%">
          <UserEditModalInner closeModal={userEditCloseModal} />
        </Modal>
      )}
      {/* 設定Modal */}
      {userSettingIsOpen && (
        <Modal open onClose={() => alertThenExecute(userSettingCloseModal)} dialogProps={{fullWidth: true}} width="95%">
          <UserSettingModalInner closeModal={userSettingCloseModal} />
        </Modal>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          gridTemplateRows: 'repeat(4,1fr)',
          justifyContent: 'center',
          marginTop: '1rem',
          padding: '0 1.5rem 0 1.5rem',
        }}
      >
        <div className={css({gridRow: '1 / 3', gridColumn: '1/2'})}>
          {/* Icon */}
          <div className={css({width: '60px', height: '60px', borderRadius: '50%'})}>
            <Image
              unoptimized
              src={user.image || '/assets/images/un.webp'}
              alt="icon"
              className={css({borderRadius: '50%'})}
              width={60}
              height={60}
            />
          </div>
        </div>

        {/* 名前 */}
        <div className={css({gridRow: '3/4', gridColumn: '1/6'})}>
          <div className={css({fontSize: '1.1rem', fontWeight: 'bold', color: '#323232'})}>{user.name || 'ゲスト'}</div>
        </div>
        {/* ID */}
        <div className={css({gridRow: '4/5', gridColumn: '1/4'})}>
          <div className={css({fontSize: '0.9rem'})}>{`@${user.userName}` || '@gest'}</div>
        </div>
        {/* 編集 */}
        {currentUserId === user.id ? (
          <div className={css({gridRow: '1/3', gridColumn: '4/7', mt: '1.3rem', justifySelf: 'end'})}>
            <button
              type="button"
              onClick={() => loginCheck() && userEditOpenModal({})}
              className={css({
                backgroundColor: '#FFF',
                borderRadius: '30px',
                border: '1px solid #367B9D',
                padding: '0.5rem 2rem 0.5rem 2rem',
                fontSize: '0.9rem',
                color: '#367B9D',
                fontWeight: 'semibold',
              })}
            >
              編集
            </button>
            {/* 設定ボタン */}
            <IconButton onClick={() => loginCheck() && userSettingOpenModal({})}>
              <Iconify icon="radix-icons:gear" sx={{width: 26, height: 26, color: '#808080', mb: '0.2rem'}} />
            </IconButton>
          </div>
        ) : (
          <>
            {/* フォローbutton */}
            <div className={css({gridRow: '1/3', gridColumn: '4/7', mt: '1.3rem', justifySelf: 'end'})}>
              {follow ? (
                <button
                  type="button"
                  onClick={handleLike}
                  className={css({
                    padding: '0.5rem 0.9rem 0.5rem 0.9rem',
                    fontSize: '0.9rem',
                    color: '#367B9D',
                    fontWeight: 'semibold',
                  })}
                >
                  フォロー解除
                </button>
              ) : (
                <button
                  onClick={handleLike}
                  type="button"
                  className={css({
                    backgroundColor: '#367B9D',
                    borderRadius: '30px',
                    padding: '0.5rem 0.9rem 0.5rem 0.9rem',
                    fontSize: '0.9rem',
                    color: '#fff',
                    fontWeight: 'semibold',
                  })}
                >
                  フォローする
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserInfoSimple;
