import Image from 'next/image';
import {css} from 'styled-system/css';
import {Prisma} from '@prisma/client';
import NextLink from 'next/link';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useFollowApiMutation, useFollowApiQuery} from 'src/sections/_user/detail/c/user-simple/api';
import {IconButton, Link} from '@mui/material';
import {paths} from 'src/routes/paths';
import {useAuth} from 'src/hooks/use-auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify/Iconify';

import {useState} from 'react';
import {RemovePost} from './api';

type UserInfoSimpleProps = {
  user: Prisma.UserGetPayload<{}>;
  mountain?: Prisma.MountainGetPayload<{}> | null;
  editModalOpen?: (props?: any) => void;
};
const UserInfoSimple = ({user, mountain, editModalOpen}: UserInfoSimpleProps) => {
  // idを取得する
  const router = useRouter();
  const {id} = router.query;
  const {data: session} = useSession();
  const userId = session?.user?.id;
  const {userId: currentUserId} = useAuth();
  const removePost = RemovePost(Number(id));

  const {follow} = useFollowApiQuery(user.id, userId);
  const {createOne, deleteOne} = useFollowApiMutation(user.id, userId);

  const handleLike = (event: any) => {
    if (!userId) {
      // ログインページに飛ばす
      router.push(paths.login.path);
      return;
    }
    event.preventDefault();
    if (follow) {
      deleteOne.mutate({where: {followingId: user.id, followerId: userId}});
    } else {
      createOne.mutate({data: {followingId: user.id, followerId: userId}});
    }
  };

  const handleRemove = () => {
    if (window.confirm('本当に削除しますか？')) {
      removePost.mutate({id: Number(id)});
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    if (event) setAnchorEl(event!.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6,1fr)',
        gridTemplateRows: 'auto',
        justifyContent: 'center',
        padding: '0 1.5rem 0 1.5rem',
        marginTop: '0.3rem',
      }}
    >
      <Link component={NextLink} href={`/users/${user.id}`} sx={{WebkitTapHighlightColor: 'transparent'}}>
        <div className={css({gridRow: '1 / 3', gridColumn: '1 / 2'})}>
          {/* Icon */}
          <div className={css({width: '40px', height: '40px', borderRadius: '50%', mt: '0.3rem', ml: '-0.5rem'})}>
            <Image
              className={css({borderRadius: '50%'})}
              unoptimized
              src={user.image || '/assets/images/un.webp'}
              alt="icon"
              width={40}
              height={40}
            />
          </div>
        </div>
      </Link>
      {/* 名前 */}
      <div className={css({gridRow: '1 / 2', gridColumn: '2 / 4', alignSelf: 'center'})}>
        <div className={css({fontSize: '1.1rem', fontWeight: 'semibold', color: '#323232'})}>{user.name || 'gest'}</div>
      </div>
      {/* フォロー編集button */}
      {currentUserId === user.id ? (
        <div className={css({gridRow: '1 / 2', gridColumn: '5/ 7', alignSelf: 'center', justifySelf: 'end', marginRight: '-1rem'})}>
          <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
            <Iconify icon="majesticons:more-menu" width="30px" color="#323232" />
          </IconButton>
          <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={editModalOpen} sx={{margin: '0 10px'}}>
              <Iconify icon="pepicons-pencil:pen" width="22px" sx={{mr: '0.3rem'}} />
              編集
            </MenuItem>
            <MenuItem onClick={handleRemove} sx={{margin: '0 10px', color: '#FA541C'}}>
              <Iconify icon="ei:trash" width="26px" />
              削除
            </MenuItem>
            {/* 他のオプション */}
          </Menu>
        </div>
      ) : (
        <div className={css({gridRow: '1 / 2', gridColumn: '5/ 7', alignSelf: 'center', justifySelf: 'end'})}>
          {follow ? (
            <button
              type="button"
              onClick={handleLike}
              className={css({padding: '0.3rem 0.7rem 0.3rem 0.7rem', fontSize: '0.7rem', color: '#367B9D', fontWeight: 'semibold'})}
            >
              フォロー解除
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLike}
              className={css({
                backgroundColor: '#367B9D',
                borderRadius: '30px',
                padding: '0.3rem 0.7rem 0.3rem 0.7rem',
                fontSize: '0.7rem',
                color: '#fff',
                fontWeight: 'semibold',
              })}
            >
              フォローする
            </button>
          )}
        </div>
      )}

      <div className={css({gridRow: '2/ 3', gridColumn: '1/ 7'})}>
        {/* 場所 */}
        <div className={css({fontSize: '1.1rem', display: 'flex'})}>
          <Link href={`/mountains/${mountain?.id}`}>
            <div className={css({color: '#367B9D', textDecoration: 'underline', fontSize: '0.9rem'})}>{mountain?.name}</div>
          </Link>
          <div className={css({color: '#323232', fontSize: '0.9rem'})}>{mountain && 'から'}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSimple;
