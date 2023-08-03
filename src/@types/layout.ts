import type { NextPage, NextComponentType } from 'next';
import type { ReactNode } from 'react';

type PageTypeProps = 'post' | '404';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout(Page: NextComponentType, pageProps: P): ReactNode;
  pageType?: PageTypeProps;
};
