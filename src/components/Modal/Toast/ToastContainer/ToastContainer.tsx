import type { Toast } from '../toast.type';

import * as S from './ToastContainer.style';
import Portal from '@components/common/Portal';
import ToastBar from '../ToastBar/ToastBar';

interface ToastContainerProps {
  toasts: Toast[];
}

const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <Portal>
      <S.Container>
        {toasts.map(toast => (
          <ToastBar key={toast.id} {...toast} />
        ))}
      </S.Container>
    </Portal>
  );
};

export default ToastContainer;
