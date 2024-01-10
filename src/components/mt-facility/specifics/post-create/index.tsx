import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {PostInput} from '../../../post/create/modal/form/hooks';
import {UpdateFacilitySpecific} from './api';
import {MergedImages, PostCreateModalForm} from '../../../post/create/modal/form';

export type PostCreateModalProps = {
  viewTitle?: string;
  mtFacility: {id: number; hashtagName?: string};
  refresh?: VoidFunction;
  closeModal: VoidFunction;
};

// modalのメインのコンポーネントの中に入れるとチラつくから別に分けた
function PostCreateModalInner({refresh, viewTitle, mtFacility, closeModal}: PostCreateModalProps) {
  const {data: session} = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  const {update} = UpdateFacilitySpecific({refresh, closeModal});

  const onSubmit = async ({formValue, mergedImages}: {formValue: PostInput; mergedImages: MergedImages}) => {
    try {
      if (!userId) {
        router.push(paths.login.path);
        return;
      }
      await update.mutateAsync({
        data: {
          mtFacilityId: mtFacility.id,
          content: formValue.content,
          userId,
          activityDate: new Date(),
          hashtagName: mtFacility.hashtagName,
          images: mergedImages,
        },
      });
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };
  return <PostCreateModalForm onSubmit={onSubmit} viewTitle={viewTitle} closeModal={closeModal} />;
}

export default PostCreateModalInner;
