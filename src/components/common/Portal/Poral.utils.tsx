import type { ModalProps } from '@@types/modal';
import { isValidElement, cloneElement } from 'react';
import Toast from '@components/Modal/Toast/Toast';

export const renderPortalChildren = (
  modalConfig: ModalProps,
  onClose: () => void
) => {
  return isValidElement(modalConfig.content) ? (
    cloneElement(modalConfig.content, { ...modalConfig.props, onClose })
  ) : (
    <Toast modalConfig={modalConfig} onClose={onClose} />
  );
};
