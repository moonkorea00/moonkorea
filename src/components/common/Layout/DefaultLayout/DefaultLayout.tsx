import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@@types/layout';
import * as S from './DefaultLayout.style';
import Header from '@components/common/Header/Header';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import TableOfContents from '@components/TableOfContents/TableOfContents';

const DefaultLayout = (
  Page: NextPageWithLayout,
  pageProps: AppProps['pageProps']
) => {
  const { postFrontMatter } = pageProps;

  return (
    <S.Container>
      <Header postFrontMatter={postFrontMatter} pageType={Page.pageType} />
      {Page.pageType === 'post' && (
        <TableOfContents
          tocTree={postFrontMatter.tocTree}
          headingSlugs={postFrontMatter.headingSlugs}
        />
      )}
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
