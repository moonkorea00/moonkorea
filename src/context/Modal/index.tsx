import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { ModalProps } from '@@types/modal';
import { useState, useContext, createContext } from 'react';
import PortalContainer from '@components/common/Portal/PortalContainer';

interface ContextProps {
  children: ReactNode;
}

interface ModalContext {
  modalConfig: ModalProps | null;
  setModalConfig: Dispatch<SetStateAction<ModalProps | null>>;
}

const ModalContext = createContext<ModalContext | null>(null);

const ModalProvider = ({ children }: ContextProps) => {
  const [modalConfig, setModalConfig] = useState<ModalProps | null>(null);

  return (
    <ModalContext.Provider value={{ modalConfig, setModalConfig }}>
      {children}
      {modalConfig && <PortalContainer />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModalContext = () => {
  const value = useContext(ModalContext);

  if (!value) {
    throw new Error('Modal context not found');
  }

  return value;
};
