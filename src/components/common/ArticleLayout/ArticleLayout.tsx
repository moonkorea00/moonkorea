import * as S from './ArticleLayout.style';
import { useRef } from 'react';
import Utterances from '@components/Utterances/Utterances';
import useOnScreen from '@hooks/useOnScreen';

interface ArticleLayoutProps {
  children: React.ReactNode;
  pageType?: string;
}

const ArticleLayout = ({ children, pageType }: ArticleLayoutProps) => {
  const viewportBottom = useRef() as any;
  useOnScreen(viewportBottom);

  return (
    <S.ArticleContainer>
      {children}
      {pageType === 'post' && <Utterances />}
      <div ref={viewportBottom} />
    </S.ArticleContainer>
  );
};

export default ArticleLayout;
