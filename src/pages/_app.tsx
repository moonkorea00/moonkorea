import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import GlobalStyle from '@styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import theme from '@styles/theme';
import Layout from '@components/common/Layout/Layout';
import ChannelTalk from '@components/common/Script/ChannelTalk';
import GoogleAnalytics from '@components/common/Script/GoogleAnalytics';
import useGoogleAnalytics from '@utils/useGoogleAnalytics';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const queryClient = new QueryClient();
  useGoogleAnalytics();
  
  return (
    <>
      <GoogleAnalytics />
      <ChannelTalk />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <SessionProvider session={session}>
              <GlobalStyle />
              <ThemeProvider theme={theme}>
                <Layout>
                  <Component {...pageProps} />
                  <Analytics />
                </Layout>
              </ThemeProvider>
            </SessionProvider>
          </RecoilRoot>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
