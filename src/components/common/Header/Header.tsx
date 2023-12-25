import type { MetaData } from '@@types/metaData';

import * as S from './Header.style';
import Nav from '../Nav/Nav';
import HeaderContent from './HeaderContent/HeaderContent';

import useIsIntersected from '@hooks/useIsIntersected';

interface HeaderProps {
  postFrontMatter?: MetaData;
  pageType?: string;
}

const Header = ({ postFrontMatter, pageType }: HeaderProps) => {
  const { isIntersected, ref } = useIsIntersected();

  return (
    <S.Container ref={ref} id="header">
      <Nav isHeaderInView={isIntersected} />
      <S.HeadingContainer>
        <HeaderContent pageType={pageType} postFrontMatter={postFrontMatter} />
      </S.HeadingContainer>
    </S.Container>
  );
};

export default Header;
