import * as S from './Fallback.style';
import type { ReactNode } from 'react';
import type { ErrorBoundaryError } from '../types';
import { isAxiosError } from 'axios';

interface ErrorFallbackMainProps {
  children: ReactNode;
}

interface MessageProps {
  err: ErrorBoundaryError;
  children: ReactNode;
}

interface ActionButtonProps {
  onClickHandler: () => void;
  children: ReactNode;
}

const ErrorFallbackMain = ({ children }: ErrorFallbackMainProps) => {
  return <S.Container>{children}</S.Container>;
};

const Message = ({ err, children }: MessageProps) => {
  return (
    <S.FallbackMessage>
      {children}&emsp;
      {isAxiosError(err) && err.response?.status && (
        <span>({err.response?.status}에러)</span>
      )}
    </S.FallbackMessage>
  );
};

const ActionButton = ({ onClickHandler, children }: ActionButtonProps) => {
  return (
    <S.FallbackButton onClick={onClickHandler}>{children}</S.FallbackButton>
  );
};

export const ErrorFallback = Object.assign(ErrorFallbackMain, {
  Message,
  ActionButton,
});
