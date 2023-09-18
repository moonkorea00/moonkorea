import type { MetaData } from '@@types/metaData';
import * as S from './HeaderContent.style';
import PostHeader from '../PostHeader/PostHeader';

type HeaderMetaData = Omit<MetaData, 'id'>;

interface HeaderContentProps {
  postFrontMatter?: HeaderMetaData;
  pageType?: string;
}

const HeaderContent = ({ postFrontMatter, pageType }: HeaderContentProps) => {
  switch (pageType) {
    case 'post':
      return <PostHeader {...(postFrontMatter as HeaderMetaData)} />;
    case '404':
      return <S.Heading>404</S.Heading>;
    default:
      return <S.Heading>moonkorea | Tech Blog</S.Heading>;
  }
};

export default HeaderContent;
