import type { MetaData } from '@@types/metaData';
import * as S from './HeaderContent.style';
import PostHeader from '../PostHeader/PostHeader';

type HeaderMetaData = Omit<MetaData, 'id'>;

interface HeaderContentProps {
  metaData?: HeaderMetaData;
  pageType?: string;
}

const HeaderContent = ({ metaData, pageType }: HeaderContentProps) => {
  switch (pageType) {
    case 'post':
      return <PostHeader metaData={metaData as HeaderMetaData} />;
    case '404':
      return <S.Heading>404</S.Heading>;
    default:
      return <S.Heading>moonkorea | Tech Blog</S.Heading>;
  }
};

export default HeaderContent;
