import * as S from './Toast.style';
import { useRef } from 'react';
import Overlay from '@components/common/Layout/Overlay/Overlay';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { ModalProps } from '@@types/modal';

interface ToastProps {
  modalConfig: ModalProps;
  onConfirm?: () => void;
  onClose: () => void;
}

const Toast = ({ modalConfig, onConfirm, onClose }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(toastRef, onClose);

  return (
    <Overlay layoutType="toast">
      <S.Container ref={toastRef}>
        <div>{modalConfig.content as string}</div>
        {modalConfig.type === 'dialog' && (
          <S.ButtonWrapper>
            <S.Button onClick={onClose}>취소</S.Button>
            <S.Button onClick={onConfirm} action="delete">
              {modalConfig.confirmText}
            </S.Button>
          </S.ButtonWrapper>
        )}
      </S.Container>
    </Overlay>
  );
};

export default Toast;
