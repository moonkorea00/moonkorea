import type { ModalProps } from '@@types/modal';

import * as S from './Toast.style';
import Overlay from '@components/common/Layout/Overlay/Overlay';
import OutsideClickWrapper from '@components/common/OutsideClickWrapper/OutsideClickWrapper';

interface ToastProps {
  modalConfig: ModalProps;
  onConfirm?: () => void;
  onClose: () => void;
}

const Toast = ({ modalConfig, onClose }: ToastProps) => {
  return (
    <Overlay type="toast">
      <OutsideClickWrapper onClickHandler={onClose}>
        <S.Container>
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
      </OutsideClickWrapper>
    </Overlay>
  );
};

export default Toast;
