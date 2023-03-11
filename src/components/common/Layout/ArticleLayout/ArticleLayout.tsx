import * as S from './ArticleLayout.style';
import CommentSection from '@components/Comments/CommentSection';

interface ArticleLayoutProps {
  children: React.ReactNode;
  pageType?: 'post';
}

const ArticleLayout = ({ children, pageType }: ArticleLayoutProps) => {
  return (
    <S.Container>
      {children}
      {pageType === 'post' && <CommentSection />}
    </S.Container>
  );
};

export default ArticleLayout;
