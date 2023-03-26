import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from '@styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import theme from '@styles/theme';
import ChannelIo from '@components/common/Script/ChannelIO';
import GoogleAnalytics from '@components/common/Script/GoogleAnalytics';
import useGoogleAnalytics from '@utils/useGoogleAnalytics';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retryOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  useGoogleAnalytics();

  return (
    <>
      <GoogleAnalytics />
      <ChannelIo />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
            <SessionProvider session={session}>
              <GlobalStyle />
              <ThemeProvider theme={theme}>
                  <Component {...pageProps} />
                  <Analytics />
              </ThemeProvider>
            </SessionProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
