'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import Header from '@components/common/Header/Header';
import ErrorWithRedirection from '@components/common/Error/ErrorWithRedirection';

interface ErrorProps {
  error: Error;
}

export const metaData = {
  title: '에러',
};

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <>
      <Header />
      <ErrorWithRedirection>
        <p>문제가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
      </ErrorWithRedirection>
    </>
  );
};

export default Error;
