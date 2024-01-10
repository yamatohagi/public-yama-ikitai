import {PostInput} from 'src/components/post/create/modal/form/hooks';
import {MergedImages, PostCreateModalForm} from 'src/components/post/create/modal/form';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {paths} from 'src/routes/paths';
import {PostCreateModalState} from './state';
import {UpdateFacilitySpecific} from './api';

export type PostCreateModalProps = {
  modalState: ReturnType<typeof PostCreateModalState>;
  refetch?: VoidFunction;
};

function PostCreateModalInner({modalState, refetch}: PostCreateModalProps) {
  const {
    closeModal,
    modalProps: {viewTitle},
  } = modalState;
  const router = useRouter();
  const mtId = Number(router.query.id);
  const {data: session} = useSession();
  const userId = session?.user?.id;

  const {update} = UpdateFacilitySpecific({closeModal, refetch});

  const onSubmit = async ({formValue, mergedImages}: {formValue: PostInput; mergedImages: MergedImages}) => {
    try {
      if (!userId) {
        router.push(paths.login.path);
        return;
      }

      await update.mutateAsync({
        data: {
          mtId,
          content: formValue.content,
          userId,
          activityDate: new Date(),
          hashtagName: modalState.modalProps.hashTag,
          images: mergedImages,
        },
      });
    } catch (error) {
      alert(`Error :${error?.toString()}`);
    }
  };
  return <PostCreateModalForm onSubmit={onSubmit} viewTitle={viewTitle || ''} closeModal={closeModal} />;
}

export default PostCreateModalInner;
