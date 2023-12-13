import type { MetaData } from '@@types/metaData';
import * as S from './Header.style';
import { useRef } from 'react';
import Nav from '../Nav/Nav';
import HeaderContent from './HeaderContent/HeaderContent';
import useIsIntersected from '@hooks/useIsIntersected';

interface HeaderProps {
  postFrontMatter?: MetaData;
  pageType?: string;
}

const Header = ({ postFrontMatter, pageType }: HeaderProps) => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const isHeaderInView = useIsIntersected(headerRef);

  return (
    <S.Container ref={headerRef} id="header">
      <Nav isHeaderInView={isHeaderInView} />
      <S.HeadingContainer>
        <HeaderContent pageType={pageType} postFrontMatter={postFrontMatter} />
      </S.HeadingContainer>
    </S.Container>
  );
};

export default Header;
