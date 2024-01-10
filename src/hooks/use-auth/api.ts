import {trpc} from 'src/utils/trpc';

type GetUserInfoProps = {
  userId?: string | null;
  userInfo?: boolean;
};
export function GetUserInfo({userId, userInfo}: GetUserInfoProps) {
  const {data} = trpc.userInfo.findOne.useQuery(undefined, {
    enabled: !!userId && userInfo,
  });
  return {data};
}
