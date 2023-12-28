import {withSentryConfig} from '@sentry/nextjs';
/* eslint-disable no-undef */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withSentryConfig({
productionBrowserSourceMaps: true,

webpack(config, { dev }) {
if (dev) {
  config.devtool = 'source-map';
}
return config;
}
}, {
// sentry 플러그인 옵션:
// https://github.com/getsentry/sentry-webpack-plugin#options

// Suppresses source map uploading logs during build
silent: true,
org: "moonkorea",
project: "moonkorea-blog",
authToken: process.env.SENTRY_AUTH_TOKEN,
}, {
// 옵션:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Transpiles SDK to be compatible with IE11 (increases bundle size)
transpileClientSDK: true,

// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors.
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});
// bundleAnalyzerConfig