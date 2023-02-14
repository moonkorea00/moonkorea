import * as S from './Toast.style';
import { useRef } from 'react';
import ModalLayout from '../Layout/ModalLayout';
import useUnmountIfClickedOutside from '../hooks/useUnmoutIfClickedOutside';
import { ModalProps } from '@@types/modal';

interface ToastProps {
  modalConfig: ModalProps;
  onConfirm?: () => void;
  onClose: () => void;
}

const Toast = ({ modalConfig, onConfirm, onClose }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  useUnmountIfClickedOutside(toastRef, onClose);

  return (
    <ModalLayout layoutType="toast">
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
    </ModalLayout>
  );
};

export default Toast;
