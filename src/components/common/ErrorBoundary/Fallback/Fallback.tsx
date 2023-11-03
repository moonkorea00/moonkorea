/* eslint-disable @typescript-eslint/ban-types */
import * as S from './Fallback.style';
import type { ActionButtonProps, MessageProps } from '../types';
import { isAxiosError } from 'axios';

const ErrorFallbackMain = ({
  children,
}: PropsWithStrictChildren) => {
  return <S.Container>{children}</S.Container>;
};

const Message = ({ err, children }: PropsWithStrictChildren<MessageProps>) => {
  return (
    <S.FallbackMessage>
      {children}&emsp;
      {isAxiosError(err) && err.response?.status && (
        <span>({err.response?.status}에러)</span>
      )}
    </S.FallbackMessage>
  );
};

const ActionButton = ({
  onClickHandler,
  children,
}: PropsWithStrictChildren<ActionButtonProps>) => {
  return (
    <S.FallbackButton onClick={onClickHandler}>{children}</S.FallbackButton>
  );
};

export const ErrorFallback = Object.assign(ErrorFallbackMain, {
  Message,
  ActionButton,
});
