import type { ErrorFallbackProps } from '../types';
import { ErrorFallback } from './Fallback';

type DefaultErrorFallbackProps = Omit<ErrorFallbackProps, 'onRetry'>;

const DefaultErrorFallback = ({ err }: DefaultErrorFallbackProps) => {
  return (
    <ErrorFallback>
      <ErrorFallback.Message err={err}>
        문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </ErrorFallback.Message>
    </ErrorFallback>
  );
};

export default DefaultErrorFallback;
