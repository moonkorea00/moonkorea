import ErrorWithRedirection from '@components/common/Error/ErrorWithRedirection';

interface GlobalErrorFallbackProps {
  statusCode?: number;
}

const GlobalErrorFallback = ({ statusCode }: GlobalErrorFallbackProps) => {
  return (
    <ErrorWithRedirection>
      <h3>문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</h3>
      {statusCode &&<p>{statusCode} 에러</p>}
      <h4>
        에러가 지속되면{' '}
        <a
          href="https://github.com/moonkorea00/moonkorea/issues"
          target="_blank"
          rel="noopener"
        >
          여기
        </a>
        로 문의해 주세요.
      </h4>
    </ErrorWithRedirection>
  );
};

export default GlobalErrorFallback;
