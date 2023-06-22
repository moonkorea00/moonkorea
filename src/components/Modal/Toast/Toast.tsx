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

const Toast = ({ modalConfig, onClose }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(toastRef, onClose);

  return (
    <Overlay layoutType="toast">
      <S.Container ref={toastRef}>
        <div>{modalConfig.content}</div>
        {modalConfig.type === 'dialog' && (
          <S.ButtonWrapper>
            <S.Button onClick={onClose}>취소</S.Button>
            <S.Button
              onClick={modalConfig.props.onConfirm}
              action="destroy"
              disabled={modalConfig.props.disabled}
            >
              {modalConfig.confirmText}
            </S.Button>
          </S.ButtonWrapper>
        )}
      </S.Container>
    </Overlay>
  );
};

export default Toast;
