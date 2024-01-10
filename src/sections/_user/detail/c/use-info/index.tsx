import {Fragment} from 'react';
import UserInfoSimpleSkeleton from './skeleton';

import {UserDetailGetGetResultType} from '../user-simple/api';

type UserInfoSimpleProps = {
  user: UserDetailGetGetResultType | undefined;
};

const UserInfo = ({user}: UserInfoSimpleProps) => {
  if (!user) {
    return <UserInfoSimpleSkeleton />;
  }

  return (
    <div style={{margin: '0 1.5rem 0.5rem 1.5rem', fontSize: '0.9rem'}}>
      <div>
        {user?.userProfileText &&
          user?.userProfileText
            .replace(/\\n/g, '\n')
            .split('\n')
            .map((line, index, array) => (
              <Fragment key={index}>
                {line}
                {index !== array.length - 1 && <br />}
              </Fragment>
            ))}
      </div>
    </div>
  );
};

export default UserInfo;
