import {
  ReactQueryClientProvider,
  NextAuthSessionProvider,
  StyledComponentsProvider,
} from '@components/common/Providers';
import ModalProvider from '@context/Modal';
import {
  GoogleAnalytics,
  ChannelIO,
  KakaoScript,
} from '@components/common/Script';
import PageLayout from '@components/common/Layout/Page/PageLayout';

export const metadata = {
  title: {
    default: 'moonkorea 개발 블로그',
    template: '%s | moonkorea',
  },
  description: 'moonkorea 개발 블로그입니다.',
  metadataBase: new URL('https://moonkorea.dev'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'moonkorea 개발 블로그',
    description: 'moonkorea 개발 블로그',
    siteName: 'moonkorea 개발 블로그',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('moonkorea | Tech Blog')}`,
      },
    ],
  },
  twitter: {
    title: 'moonkorea 개발 블로그',
    description: 'moonkorea 개발 블로그	',
    card: 'summary_large_image',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('moonkorea | Tech Blog')}`,
      },
    ],
  },
};

const RootLayout = ({ children }: PropsWithStrictChildren) => {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsProvider>
          <NextAuthSessionProvider>
            <ModalProvider>
              <ReactQueryClientProvider>
                <PageLayout>{children}</PageLayout>
              </ReactQueryClientProvider>
            </ModalProvider>
          </NextAuthSessionProvider>
        </StyledComponentsProvider>
        <GoogleAnalytics />
        <ChannelIO />
        <KakaoScript />
      </body>
    </html>
  );
};

export default RootLayout;
