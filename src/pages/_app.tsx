import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/GlobalStyle';
import theme from '@styles/theme';
import Layout from '@components/common/Layout/Layout';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
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
  );
};

export default App;
