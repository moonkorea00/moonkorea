'use client';

import * as S from './PageLayout.style';

const PageLayout = ({ children }: PropsWithStrictChildren) => {
  return <S.Container>{children}</S.Container>;
};

export default PageLayout;
