import Divider from 'src/components/ui/Divider';
import {css} from 'styled-system/css';
import React from 'react';
import MainLayout from 'src/layouts/main/MainLayout';
import Iconify from 'src/components/iconify';
import Image from 'next/image';
import {timeAgo} from 'src/utils/formatTime';
import {trpc} from 'src/utils/trpc';
import {useAuth} from 'src/hooks/use-auth';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {useFollowApiMutation, useFollowApiQuery} from 'src/sections/_user/detail/c/user-simple/api';
import Link from 'next/link';

NoticePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default function NoticePage() {
  const {userId: currentUserId, loginCheck} = useAuth();
  const {data: session} = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const createOne = trpc.userFollow.createOne.useMutation({
    onSuccess: () => {
      console.log('フォロー成功');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteOne = trpc.userFollow.deleteMany.useMutation({
    onSuccess: () => {
      console.log('フォロー解除成功');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const follow = true;
  /* 山のエリアを取得 */
  const {data} = trpc.notice.findMany.useQuery({
    // select: {
    //   id: true,
    //   type: true,
    //   FromUser: {
    //     select: {
    //       id: true,
    //       name: true,
    //       image: true,
    //     },
    //   },
    // },
  });

  const handleF = (event: any) => {
    event.preventDefault();

    if (!userId) {
      // ログインページに飛ばす
      router.push(paths.login.path);

      // eslint-disable-next-line no-useless-return
      return;
    }

    // if (follow) {
    //   deleteOne.mutate({where: {followingId: user.id, followerId: userId}});
    // } else {
    //   createOne.mutate({data: {followingId: user.id, followerId: userId}});
    // }
  };

  // const data = [
  //   {
  //     id: 1,
  //     type: 'like',
  //     fromUserId: 'mai',
  //     toUserId: 'pokey',
  //     userImage: 'https://profile.line-scdn.net/0hneEViu8XMUp4LyWvkBpOHURqPycPATcCAE52Kg8pOHtRTyZJQhx_JVl4PXNdH3RMEEh7eQonZi0C',
  //     createdAt: new Date('2023-12-12 12:12:12'),
  //     postId: '123',
  //   },
  //   {
  //     id: 2,
  //     type: 'follow',
  //     fromUserId: 'roku',
  //     toUserId: 'pokey',
  //     userImage: 'https://profile.line-scdn.net/0hneEViu8XMUp4LyWvkBpOHURqPycPATcCAE52Kg8pOHtRTyZJQhx_JVl4PXNdH3RMEEh7eQonZi0C',
  //     createdAt: new Date('2023-12-10 12:12:12'),
  //   },
  //   {
  //     id: 3,
  //     type: 'comment',
  //     fromUserId: 'roku',
  //     toUserId: 'pokey',

  //     userImage: 'https://profile.line-scdn.net/0hneEViu8XMUp4LyWvkBpOHURqPycPATcCAE52Kg8pOHtRTyZJQhx_JVl4PXNdH3RMEEh7eQonZi0C',
  //     createdAt: new Date('2023-12-0912:12:12'),
  //     commentText: '素敵ですね！！！！！！！！',
  //     postId: '234',
  //   },
  //   {
  //     id: 4,
  //     type: 'like',
  //     fromUserId: 'pokey',
  //     toUserId: 'mai',
  //     userImage: 'https://profile.line-scdn.net/0hneEViu8XMUp4LyWvkBpOHURqPycPATcCAE52Kg8pOHtRTyZJQhx_JVl4PXNdH3RMEEh7eQonZi0C',
  //     createdAt: new Date('2023-12-12 20:12:12'),
  //     postId: '123',
  //   },
  // ];

  return (
    <>
      <Divider className={css({pb: '0.5rem', pt: '0.5rem'})} width="100%" />
      {data?.map((item) => (
        <div key={item.id}>
          <div className={css({display: 'flex', alignItems: 'center', color: '#323232', fontSize: '1rem'})}>
            {item.type === 'like' && <Iconify icon="mdi:heart" sx={{width: 25, height: 25, color: '#FE374F', margin: '1rem'}} />}
            {item.type === 'follow' && (
              <div className={css({width: '40px', height: '40px', borderRadius: '50%', margin: '0 1rem'})}>
                <Image className={css({borderRadius: '50%'})} unoptimized src={item.userImage} alt="icon" width={40} height={40} />
              </div>
            )}
            {item.type === 'comment' && (
              <div className={css({width: '40px', height: '40px', borderRadius: '50%', margin: '0 1rem'})}>
                <Image className={css({borderRadius: '50%'})} unoptimized src={item.userImage} alt="icon" width={40} height={40} />
              </div>
            )}

            <div className={css({display: 'Inline', mr: '1rem', fontSize: '15px'})}>
              <Link href={`/users/${item.fromUserId}`}>
                <span className={css({fontWeight: 'bold'})}>@{item.fromUserId}</span>
              </Link>
              {item.type === 'like' && ' さんが投稿にいいねしました'}
              {item.type === 'follow' && ' さんがあなたをフォローしました'}
              {item.type === 'comment' && ' さんが投稿にコメントしました'}
              {/* ここで時間の計算を行う */}
              <span className={css({marginLeft: '1rem', fontSize: '12px', color: '#808080'})}>{timeAgo(item.createdAt)}</span>
            </div>
          </div>

          {item.type === 'comment' && (
            <div
              className={css({
                marginLeft: '3.5rem',
                fontSize: '1rem',
                color: '#323232',
                width: '85%',
                wordWrap: 'breakWord',
                wordBreak: 'breakAll',
              })}
            >
              「hoge」
            </div>
          )}

          {item.type === 'follow' && (
            <button
              type="button"
              onClick={() => console.log('フォロー解除')}
              className={css({
                backgroundColor: '#367B9D',
                borderRadius: '8px',
                ml: '3rem',
                mt: '0.2rem',
                padding: '0.3rem 0.7rem 0.3rem 0.7rem',
                fontSize: '0.7rem',
                color: '#fff',
                fontWeight: 'semibold',
              })}
            >
              {follow ? 'フォローする' : 'フォロー解除'}
            </button>
          )}

          {item.type === 'comment' && (
            <button
              type="button"
              onClick={() => console.log('フォロー解除')}
              className={css({
                ml: '3.5rem',
                mt: '0.2rem',
                fontSize: '12px',
                color: '#367B9D',
                fontWeight: 'semibold',
              })}
            >
              返信する
            </button>
          )}

          <Divider className={css({pb: '0.5rem', pt: '0.5rem'})} width="100%" />
        </div>
      ))}
    </>
  );
}
