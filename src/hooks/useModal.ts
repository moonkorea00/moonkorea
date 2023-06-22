import { useRef, useEffect } from 'react';
import { useModalContext } from '@context/Modal';
import { MODAL_CONFIG } from '@components/Modal/Modal.utils';

interface ShowModalProps<T> {
  name: keyof typeof MODAL_CONFIG;
  props?: T;
}

const useModal = () => {
  const timer = useRef<number | null>(null);

  const { modalConfig, setModalConfig } = useModalContext();

  const showModal = <T>({ name, props }: ShowModalProps<T>) => {
    const config = { ...MODAL_CONFIG[name], props };

    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    setModalConfig(config);

    if ('duration' in config) {
      timer.current = window.setTimeout(() => {
        setModalConfig(null);
      }, config.duration);
    }
  };

  const closeModal = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    setModalConfig(null);
  };

  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return { modalConfig, showModal, closeModal };
};

export default useModal;
