// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

import { reportWithWebhook } from './src/api/webHooks/reportWithWebhook';

import { isProduction } from './src/utils/env';
import { SENTRY_DSN } from './src/utils/sentry';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  enabled: isProduction(),
  beforeSend(event) {
    if (isProduction()) {
      if (event.exception) {
        reportWithWebhook(event);
      }
    }
    return event;
  },
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
