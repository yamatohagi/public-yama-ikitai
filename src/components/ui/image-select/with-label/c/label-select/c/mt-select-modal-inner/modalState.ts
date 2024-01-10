import {useModal} from 'src/hooks/useModal';

export const useMtSelectModal = () =>
  useModal<{
    labelUpdate: ((v: {mtId: number; newLabelText: string}) => void) | null;
  }>({labelUpdate: null});
