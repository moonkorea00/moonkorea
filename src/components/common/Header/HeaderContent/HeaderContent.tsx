import * as S from './HeaderContent.style';
import PostHeader from '../PostHeader/PostHeader';

interface HeaderContentProps {
  metaData?: metDataProps;
  pageType?: string;
}

interface metDataProps {
  title: string;
  tags: string;
  description: string;
  date: string;
}

const HeaderContent = ({ pageType, metaData }: HeaderContentProps) => {
  switch (pageType) {
    case 'post':
      return <PostHeader metaData={metaData as metDataProps} />;
    case '404':
      return <S.Heading>404</S.Heading>;
    default:
      return <S.Heading>moonkorea | Tech Blog</S.Heading>;
  }
};

export default HeaderContent;
