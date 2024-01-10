import {useModal} from 'src/hooks/useModal';

export function PostCreateModalState() {
  const state = useModal<{
    viewTitle: string | null;
    hashTag: string | null;
  }>({
    viewTitle: null,
    hashTag: null,
  });
  return state;
}
