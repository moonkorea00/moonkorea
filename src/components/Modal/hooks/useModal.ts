import { useState, useRef, useEffect } from 'react';
import { ModalProps } from '@@types/modal';

const useModal = () => {
  const [modalConfig, setModalConfig] = useState<ModalProps | null>(null);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current!);
    };
  }, []);

  const showModal = (props: ModalProps) => {
    clearTimeout(timeoutId.current!);
    setModalConfig(props);
    if (props.duration) {
      timeoutId.current = window.setTimeout(() => {
        setModalConfig(null);
      }, props.duration);
    }
  };

  const closeModal = () => {
    clearTimeout(timeoutId.current!);
    setModalConfig(null);
  };

  return {
    modalConfig,
    showModal,
    closeModal,
  };
};

export default useModal;
