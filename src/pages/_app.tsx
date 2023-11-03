import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@@types/layout';

import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

import ReactQueryClientProvider from '@components/common/Providers/QueryClient';
import { GlobalErrorBoundary } from '@components/common/ErrorBoundary';
import ModalProvider from '@context/Modal';
import {
  GoogleAnalytics,
  ChannelIO,
  KakaoScript,
} from '@components/common/Script';

import { ThemeProvider, GlobalStyle, theme } from '@styles';

import useGoogleAnalytics from '@hooks/useGoogleAnalytics';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const getLayout =
    (Component as NextPageWithLayout).getLayout ??
    ((Page: NextComponentType, props: AppProps['pageProps']) => (
      <Page {...props} />
    ));

  useGoogleAnalytics();

  return (
    <>
      <GoogleAnalytics />
      <ChannelIO />
      <KakaoScript />
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <ModalProvider>
            <ReactQueryClientProvider pageProps={pageProps}>
              <GlobalStyle />
              <GlobalErrorBoundary>
                {getLayout(Component, pageProps)}
              </GlobalErrorBoundary>
              <Analytics />
            </ReactQueryClientProvider>
          </ModalProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
