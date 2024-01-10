import {PrimitiveAtom, atom, useAtom} from 'jotai';

/**
 * 型安全なモーダル状態管理
 * @param initialState// 初期状態 例：{isOpen: false, modalProps: {}}
 * @param T// モーダルのpropsの型 createModalAtom<{word?: string}>(); 例：{word?: string}

 */

type ModalState<T = {}> = {
  isOpen: boolean;
  modalProps: T;
};

export const createModalAtom = <T = {}>(initialState: ModalState<T> = {isOpen: false, modalProps: {} as T}) =>
  atom<ModalState<T>>({
    ...initialState,
    isOpen: initialState.isOpen || false,
  });

export const useModalState = <T>(modalAtom: PrimitiveAtom<ModalState<T>>) => {
  const [state, setState] = useAtom(modalAtom);

  const openModal = (props: T) => {
    setState({
      isOpen: true,
      modalProps: props,
    });
  };

  const closeModal = () => {
    setState({
      isOpen: false,
      modalProps: {} as T,
    });
  };

  return {
    isOpen: state.isOpen,
    modalProps: state.modalProps,
    openModal,
    closeModal,
  };
};
