import type { Toast } from '../toast.type';

import * as S from './ToastBar.style';

import { useToastContext } from '@context/Toast';

const ToastBar = ({
  id,
  type,
  description,
  confirmLabel,
  confirmType,
  dismissLabel,
  onConfirm,
  style,
}: Omit<Toast, 'duration'>) => {
  const toast = useToastContext();
  return (
    <S.Container style={style}>
      <div>{description}</div>
      {type === 'dialog' && (
        <S.ButtonWrapper>
          <S.Button onClick={() => toast.remove(id)}>{dismissLabel}</S.Button>
          <S.Button onClick={onConfirm} action={confirmType}>
            {confirmLabel}
          </S.Button>
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
};

export default ToastBar;
