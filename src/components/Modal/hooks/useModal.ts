import { useState, useRef, useEffect } from 'react';
import { MODAL_CONFIG } from '../Modal.utils';
import { ModalProps } from '@@types/modal';

const useModal = () => {
  const [modalConfig, setModalConfig] = useState<ModalProps | null>(null);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const showModal = (modalKey: keyof typeof MODAL_CONFIG) => {
    const config = MODAL_CONFIG[modalKey];

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }
    setModalConfig(config);

    if ('duration' in config) {
      timeoutId.current = window.setTimeout(() => {
        setModalConfig(null);
      }, config.duration);
    }
  };

  const closeModal = () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }
    setModalConfig(null);
  };

  return {
    modalConfig,
    showModal,
    closeModal,
  };
};

export default useModal;
