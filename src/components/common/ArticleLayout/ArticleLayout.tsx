import * as S from './ArticleLayout.style';
import Utterances from '@components/Utterances/Utterances';

interface ArticleLayoutProps {
  children: React.ReactNode;
  pageType?: string;
}

const ArticleLayout = ({ children, pageType }: ArticleLayoutProps) => {
  return (
    <S.ArticleContainer>
      {children}
      {pageType === 'post' && <Utterances />}
    </S.ArticleContainer>
  );
};

export default ArticleLayout;
