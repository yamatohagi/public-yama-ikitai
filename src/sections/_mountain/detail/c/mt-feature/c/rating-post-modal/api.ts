import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {useState} from 'react';
import {GetMtFeaturesTspAtom} from '../../state';

type PostRatingProps = {
  closeModal: VoidFunction;
};
export function PostRating({closeModal}: PostRatingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [, setRefetchTimeStamp] = useAtom(GetMtFeaturesTspAtom);

  const post = trpc.mtFeatureRating.post.useMutation({
    onSuccess: (data) => {
      // mutateが成功した後の処理

      setRefetchTimeStamp(new Date().getTime());
      closeModal();
      setIsSubmitting(false); // ボタンを再度有効化
    },
    onError: (error) => {
      // エラーハンドリング
      console.error('Error posting rating:', error);
      setIsSubmitting(false); // エラーが発生した場合もボタンを再度有効化
    },
  });

  return {post, isSubmitting};
}
