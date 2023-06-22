/* eslint-disable @typescript-eslint/no-empty-function */
import Portal from '../Portal';
import useModal from '@hooks/useModal';
import useKeyPress from '@hooks/useKeyPress';
import { renderPortalChildren } from '../Poral.utils';

const PortalContainer = () => {
  const { modalConfig, closeModal: onClose } = useModal();
  useKeyPress({
    Escape: onClose,
    Enter: modalConfig?.props?.onConfirm ?? (() => {}),
  });

  if (!modalConfig) {
    return null;
  }

  return <Portal>{renderPortalChildren(modalConfig, onClose)}</Portal>;
};

export default PortalContainer;
