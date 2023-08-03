import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import ReactQueryClientProvider from '@components/common/Providers/QueryClient';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import ModalProvider from '@context/Modal';
import GoogleAnalytics from '@components/common/Script/GoogleAnalytics';
import ChannelIo from '@components/common/Script/ChannelIO';
import KakaoScript from '@components/common/Script/Kakao';
import useGoogleAnalytics from '@hooks/useGoogleAnalytics';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  useGoogleAnalytics();

  return (
    <>
      <GoogleAnalytics />
      <ChannelIo />
      <KakaoScript />
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <ModalProvider>
            <ReactQueryClientProvider pageProps={pageProps}>
              <GlobalStyle />
              <Component {...pageProps} />
              <Analytics />
            </ReactQueryClientProvider>
          </ModalProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
