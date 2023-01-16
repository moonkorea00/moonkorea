import * as S from './ArticleLayout.style';
import Utterances from '@components/Utterances/Utterances';

interface ArticleLayoutProps {
  children: React.ReactNode;
  pageType?: string;
}

const ArticleLayout = ({ children, pageType }: ArticleLayoutProps) => {
  return (
    <S.Container>
      {children}
      {pageType === 'post' && <Utterances />}
    </S.Container>
  );
};

export default ArticleLayout;
