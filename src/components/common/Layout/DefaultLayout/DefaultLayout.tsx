import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@@types/layout';
import * as S from './DefaultLayout.style';
import Header from '@components/common/Header/Header';
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary';

const DefaultLayout = (
  Page: NextPageWithLayout,
  pageProps: AppProps['pageProps']
) => {
  return (
    <S.Container>
      <Header
        postFrontMatter={pageProps.postFrontMatter}
        pageType={Page.pageType}
      />
      <S.Main>
        <S.ChildrenContainer>
          <ErrorBoundary>
            <Page {...pageProps} />
          </ErrorBoundary>
        </S.ChildrenContainer>
      </S.Main>
    </S.Container>
  );
};

export default DefaultLayout;
