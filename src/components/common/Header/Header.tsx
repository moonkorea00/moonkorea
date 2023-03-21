import * as S from './Header.style';
import { useRef } from 'react';
import Nav from '../Nav/Nav';
import PostHeader from './PostHeader/PostHeader';
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
  const headerRef = useRef(null);
  const isIntersected = useIsIntersected(headerRef);

  return (
    <S.Container ref={headerRef}>
      <Nav isIntersected={isIntersected} />
      <S.HeadingContainer>
        {pageType === 'post' && metaData ? (
          <PostHeader metaData={metaData} />
        ) : (
          <S.Heading>moonkorea | Tech Blog</S.Heading>
        )}
      </S.HeadingContainer>
      <S.FilledSection />
      <div />
    </S.Container>
  );
};

export default Header;
