import type { Event } from '@sentry/nextjs';

import * as Sentry from '@sentry/nextjs';

export const reportWithWebhook = async (event: Event) => {
  try {
    const payload = buildBlockKit(event);
    await fetch(process.env.NEXT_PUBLIC_WEB_HOOK_URL as string, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (_) {
    Sentry.captureMessage('failed request with slack web hook');
  }
};

// https://app.slack.com/block-kit-builder/
const buildBlockKit = (event: Event) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Sentry Error*',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Dashboard',
            emoji: true,
          },
          url: 'https://moonkorea.sentry.io/issues/?referrer=sidebar',
          action_id: 'button-action',
        },
      },
      { type: 'divider' },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*id*\n${event.event_id}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*type*\n${event.exception?.values?.[0].type}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*value*\n${event.exception?.values?.[0].value}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*handled*\n${event.exception?.values?.[0].mechanism?.handled}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*request_url*\n${event.request?.url}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*endpoint*\n${event.contexts?.['request']?.url}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*method*\n${event.contexts?.['request']?.method}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*status*\n${event.contexts?.['response']?.status}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*data*\n${JSON.stringify(event.contexts?.['response']?.data)}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*user_agent*\n${event.request?.headers?.['User-Agent']}`,
        },
      },
    ],
  };
};
