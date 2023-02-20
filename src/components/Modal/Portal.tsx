import { ModalProps } from '@@types/modal';
import { useEffect, useRef, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast/Toast';

interface PortalProps {
  modalConfig: ModalProps;
  onConfirm?: () => void;
  onClose: () => void;
}

const Portal = ({ modalConfig, onConfirm, onClose, ...rest }: PortalProps) => {
  const portalRef = useRef(document.createElement('div'));

  useEffect(() => {
    if (!modalConfig) return;
    document.body.appendChild(portalRef.current);

    return () => {
      document.body.removeChild(portalRef.current);
    };
  }, [modalConfig]);

  if (!modalConfig) return null;

  return createPortal(
    <>
      {typeof modalConfig.content === 'string' ? (
        <Toast
          modalConfig={modalConfig}
          onConfirm={onConfirm}
          onClose={onClose}
        />
      ) : (
        cloneElement(modalConfig.content, {
          ...rest,
          ...modalConfig.content.props,
          onClose,
        })
      )}
    </>,
    portalRef.current
  );
};

export default Portal;