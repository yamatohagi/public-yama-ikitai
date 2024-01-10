import {useGlobalState} from 'src/components/provider/useGlobalStore';
import {useEffect, useState} from 'react';
import UserSimple from './c/user-simple';
import PostList from './c/post-list';
import {UserDetailGet} from './c/user-simple/api';
import UserInfo from './c/use-info';
import Tab from './c/tab';
import PostMedium from './c/post-media';
import UserInfoSimpleSkeleton from './c/user-simple/skeleton';

type Props = {
  myPageUserId?: string;
};

export default function UserDetail({myPageUserId}: Props) {
  const user = UserDetailGet(myPageUserId);
  const [tabS] = useGlobalState('userProfileTabValue', 'post');
  const [tab, setTab] = useState('post');

  useEffect(() => {
    setTab(tabS);
  }, [tabS]);

  return (
    <>
      {user ? <UserSimple user={user} /> : <UserInfoSimpleSkeleton />}

      <UserInfo user={user} />

      <Tab />
      {tab === 'post' && <PostList myPageUserId={myPageUserId} />}
      {tab === 'media' && <PostMedium myPageUserId={myPageUserId} />}
      {tab === 'reply' && <PostList myPageUserId={myPageUserId} replyOnly />}
      {tab === 'like' && <PostList myPageUserId={myPageUserId} likeOnly />}
    </>
  );
}
