import type { NextPageContext } from 'next/types';
import Metadata from '@components/common/Metadata/Metadata';
import { GlobalErrorFallback } from '@components/common/ErrorBoundary';

interface ErrorPageProps {
  statusCode: number;
}

const metaData = {
  title: '에러 | moonkorea',
};

const Error = ({ statusCode }: ErrorPageProps) => {
  return (
    <>
      <Metadata metaData={metaData} />
      <GlobalErrorFallback statusCode={statusCode} />
    </>
  );
};

export default Error;

interface NextErrorResponse {
  res: NextPageContext['res'];
  err: { statusCode: number };
}

Error.getInitialProps = ({ res, err }: NextErrorResponse) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};
