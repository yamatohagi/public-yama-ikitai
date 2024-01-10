import {Grid, Link, Skeleton} from '@mui/material';
import {css} from 'styled-system/css';
import NextLink from 'next/link';
import {Fragment} from 'react';
import {paths} from 'src/routes/paths';
import Image from 'next/image';
import Iconify from 'src/components/iconify';
import PostGet from 'src/sections/_trailhead/detail/c/post-list-and-order/api';
import {timeAgo} from 'src/utils/formatTime';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import PostImages from './c/post-images';
import {useLikeApiMutation, useLikeApiQuery, usePhotoApiQuery} from './api';

type PostListItemProps = {
  post: NonNullable<ReturnType<typeof PostGet>['posts']>[0];
  i: number;
};
const PostListItem = ({post, i}: PostListItemProps) => {
  const {data: session} = useSession();
  const router = useRouter();
  const userId = session?.user?.id;

  const {createOne, deleteOne} = useLikeApiMutation(post.id, userId);

  const {postLikes} = useLikeApiQuery(post.id, userId);
  const {photos} = usePhotoApiQuery(post.id);

  const handleLike = (event: any) => {
    if (!userId) {
      // ログインページに飛ばす
      router.push(paths.login.path);
      return;
    }
    event.preventDefault();
    if (postLikes) {
      deleteOne.mutate({where: {postId: post.id, userId}});
    } else {
      createOne.mutate({data: {postId: post.id, userId}});
    }
  };

  return (
    <Grid
      container
      className={css({
        position: 'relative',
        mt: i === 0 ? '1.9rem' : '1.0rem',
      })}
    >
      <Grid item xs={2} sm={2}>
        {/* ユーザーのアイコン */}
        <Link component={NextLink} href={`${paths.user.index.path}/${post.User.id}`} color="inherit" underline="none" prefetch={false} shallow>
          <Image
            unoptimized
            className={css({borderRadius: '50%', ml: '0.7rem'})}
            src={post.User.image || '/assets/images/un.webp'}
            alt="User Icon"
            width={40} // 必要に応じてサイズを調整
            height={40} // 必要に応じてサイズを調整
          />
        </Link>
      </Grid>
      <Grid item xs={10} sm={10}>
        <Grid container className={css({})}>
          {/* ユーザーネーム、時間 */}
          <Grid item xs={12} sm={12}>
            <div className={css({display: 'flex', justifyContent: 'space-between'})}>
              <Link component={NextLink} href={`${paths.user.index.path}/${post.User.id}`} underline="none" prefetch={false} shallow>
                <div className={css({display: 'flex'})}>
                  <div className={css({color: '#323232', ml: '0.5rem'})}>@{post.User.userName || 'gest'}</div>
                  <div className={css({color: '#808080', ml: '0.5rem'})}>{timeAgo(post.createdAt)}</div>
                </div>
              </Link>
              <Link component={NextLink} href={`${paths.post.index.path}/${post.id}`} color="inherit" underline="none">
                <div>
                  {/* いいねButton */}
                  <button type="button" className={css({fontSize: '15px', mr: '1.2rem'})} onClick={handleLike}>
                    {/* iconify */}
                    {postLikes ? (
                      <Iconify icon="mdi:heart" sx={{width: 25, height: 25, color: '#FE374F'}} />
                    ) : (
                      <Iconify icon="mdi:heart-outline" sx={{width: 25, height: 25, color: '#C0C0C0'}} />
                    )}
                  </button>
                </div>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {/* 本文 */}

      <Link component={NextLink} href={`${paths.post.index.path}/${post.id}`} underline="none" sx={{width: '100%'}}>
        <Grid item xs={12} sm={12}>
          <div className={css({marginBottom: 0, color: '#323232', fontSize: '0.9rem', ml: '0.5rem', mt: '1.3rem'})}>
            <div>
              {post.PostToHashtag.map((hashtag, i) => (
                <span key={i}>
                  <Link
                    component={NextLink}
                    onClick={(e) => e.stopPropagation()}
                    href={`${paths.post.index.path}?tab=text&SearchButtonWithInput=${hashtag.Hashtag.tag}`}
                  >
                    <span className={css({color: '#367B9D', textDecoration: 'underline'})}>#{hashtag.Hashtag.tag}</span>
                  </Link>
                </span>
              ))}
            </div>
            {post.content
              .slice(0, 100)
              .replace(/\\n/g, '\n')
              .split('\n')
              .map((line, index) => (
                <Fragment key={index}>
                  {line}
                  {index !== post.content.replace(/\\n/g, '\n').split('\n').length - 1 && <br />}
                </Fragment>
              ))}
          </div>

          {/* post.contentが多かったら */}
          {post.content.length > 100 && <div className={css({color: '#808080', mt: '0.5rem', ml: '0.5rem'})}> 続きを読む</div>}
        </Grid>
        {/* 画像 */}
        <Grid item xs={12} sm={12}>
          <div className={css({width: '100%'})}>
            <PostImages images={photos} />
          </div>
        </Grid>
      </Link>
      <Grid item xs={12} sm={12}>
        <div
          className={css({
            mt: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '97%',
            height: '1px',
            background: '#EDEDED',
          })}
        />
      </Grid>
    </Grid>
  );
};

export default PostListItem;

export const PostListItemSkeleton = () => (
  <Grid container>
    {Array.from({length: 10}, (_, index) => (
      <Grid item xs={12} sm={12} key={index}>
        <Skeleton variant="circular" width="50px" height="50px" sx={{mb: 2, mt: 5, ml: 2}} />
        <Skeleton variant="rectangular" width="100%" height="200px" />
      </Grid>
    ))}
  </Grid>
);
