import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {MergedImages} from 'src/components/post/create/modal/form';
import {PostCreateModalFlexibleForm} from 'src/components/post/create/floating-button-for-flexible-input/modal-inner/c/form';

import {paths} from 'src/routes/paths';
import {UpdateFacilitySpecific} from './api';
import usePostCreateForm, {PostInput} from './hooks';

export type PostCreateModalProps = {
  viewTitle?: string;
  refresh?: VoidFunction;
  closeModal: VoidFunction;
};

function PostCreateModalInner({refresh, viewTitle, closeModal}: PostCreateModalProps) {
  const {data: session} = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const methods = usePostCreateForm();
  const {update} = UpdateFacilitySpecific({refresh, closeModal});
  const postId = Number(router.query.id);

  const onSubmit = async ({formValue, mergedImages}: {formValue: PostInput; mergedImages: MergedImages}) => {
    try {
      if (!userId) {
        router.push(paths.login.path);
        return;
      }

      await update.mutateAsync({
        data: {
          postId,
          mtFacilityId: formValue.mtFacilityId ? Number(formValue.mtFacilityId) : null,
          mtId: formValue.mtId ? Number(formValue.mtId) : null,
          trailheadId: formValue.trailheadId ? Number(formValue.trailheadId) : null,
          content: formValue.content,
          userId,
          activityDate: new Date(),
          images: mergedImages,
          hashtagIds: formValue.hashtagIds?.map((id) => Number(id)) || [],
        },
      });
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };
  return methods ? <PostCreateModalFlexibleForm methods={methods} onSubmit={onSubmit} viewTitle={viewTitle} closeModal={closeModal} /> : <>ii</>;
}

export default PostCreateModalInner;
