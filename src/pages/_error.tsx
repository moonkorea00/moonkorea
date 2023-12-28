import type { NextPageContext } from 'next/types';

import * as Sentry from '@sentry/nextjs';

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

Error.getInitialProps = async (ctx: NextPageContext) => {
  const { res, err } = ctx;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  
  await Sentry.captureUnderscoreErrorException(ctx);

  return { statusCode };
};
