import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {GetGetReplyTspAtom} from '../../state';

export const RemoveReply = () => {
  const [, setTsp] = useAtom(GetGetReplyTspAtom);
  const removePost = trpc.post.deleteOne.useMutation({
    onSuccess: () => {
      setTsp(Date.now());
    },
  });

  return removePost;
};
