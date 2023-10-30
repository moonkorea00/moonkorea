import type { ErrorFallbackProps } from '../types';
import { ErrorFallback } from './Fallback';

const RetryFallback = ({ err, onRetry }: ErrorFallbackProps) => {
  return (
    <ErrorFallback>
      <ErrorFallback.Message err={err}>
        데이터를 불러오는데 문제가 발생했습니다.
      </ErrorFallback.Message>
      <ErrorFallback.ActionButton onClickHandler={onRetry}>
        다시 시도
      </ErrorFallback.ActionButton>
    </ErrorFallback>
  );
};

export default RetryFallback;
