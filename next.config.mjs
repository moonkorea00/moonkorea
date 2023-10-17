/* eslint-disable no-undef */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default {
  productionBrowserSourceMaps: true,
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  }
};
// bundleAnalyzerConfig
