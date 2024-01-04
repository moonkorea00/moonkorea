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
  const { post } = pageProps;

  return (
    <S.Container>
      <Header {...post} pageType={Page.pageType} />
      {Page.pageType === 'post' && <TableOfContents toc={post.toc} />}
      <S.Main>
        <ErrorBoundary>
          <Page {...pageProps} />
        </ErrorBoundary>
      </S.Main>
    </S.Container>
  );
};

export default DefaultLayout;
