import type { AxiosError } from 'axios';

import * as Sentry from '@sentry/nextjs';

export const catptureErrorWithContext = (error: AxiosError) => {
  Sentry.setContext('request', {
    url: error.config?.url,
    method: error.config?.method,
  });
  Sentry.setContext('response', {
    status: error.response?.status,
    data: error.response?.data,
  });
  Sentry.captureException(error);
};

export const SENTRY_DSN =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
