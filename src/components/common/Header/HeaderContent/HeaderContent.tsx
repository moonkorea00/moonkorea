import * as S from './HeaderContent.style';
import PostHeader from '../PostHeader/PostHeader';

interface HeaderContentProps {
  title?: string;
  date?: string;
  excerpt?: string;
  pageType?: string;
}

const HeaderContent = ({
  title,
  date,
  excerpt,
  pageType,
}: HeaderContentProps) => {
  switch (pageType) {
    case 'post':
      return <PostHeader title={title} date={date} excerpt={excerpt} />;
    case '404':
      return <S.Heading>404</S.Heading>;
    default:
      return <S.Heading>moonkorea | Tech Blog</S.Heading>;
  }
};

export default HeaderContent;
