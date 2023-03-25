import * as S from './Header.style';
import { useRef } from 'react';
import Nav from '../Nav/Nav';
import HeaderContent from './HeaderContent/HeaderContent';
import useIsIntersected from '../../../hooks/useIsIntersected';

interface HeaderProps {
  metaData?: {
    id: string;
    title: string;
    tags: string;
    description: string;
    date: string;
  };
  pageType?: string;
}

const Header = ({ metaData, pageType }: HeaderProps) => {
  const headerRef = useRef<HTMLHeadElement>(null);
  const isIntersected = useIsIntersected(headerRef);

  return (
    <S.Container ref={headerRef}>
      <Nav isIntersected={isIntersected} />
      <S.HeadingContainer>
        <HeaderContent pageType={pageType} metaData={metaData} />
      </S.HeadingContainer>
      <S.FilledSection />
    </S.Container>
  );
};

export default Header;
