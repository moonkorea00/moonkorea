'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

import { GlobalErrorFallback } from '@components/common/ErrorBoundary';

interface ErrorProps {
  error: Error;
}

export const metaData = {
  title: '에러',
};

const GlobalError = ({ error }: ErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <GlobalErrorFallback />
      </body>
    </html>
  );
};

export default GlobalError;
