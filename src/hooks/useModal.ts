import {useState, useCallback} from 'react';

// モーダルの状態とプロパティを管理するカスタムフック
export const useModal = <T extends {}>(initialProps: T) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<T>(initialProps);

  // モーダルを開く関数
  const openModal = useCallback((props: T) => {
    setModalProps(props);
    setIsOpen(true);
  }, []);

  // モーダルを閉じる関数
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    modalProps,
    openModal,
    closeModal,
  };
};
