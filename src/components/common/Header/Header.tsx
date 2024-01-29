'use client';

import type { Post } from '@@types/post';

import * as S from './Header.style';
import Nav from '@components/common/Nav/Nav';
import PostHeader from './PostHeader/PostHeader';

import useIsIntersected from '@hooks/useIsIntersected';

interface HeaderProps {
  post?: Pick<Post, 'title' | 'date' | 'excerpt'>;
}

const Header = ({ post }: HeaderProps) => {
  const { isIntersected, ref } = useIsIntersected();

  return (
    <S.Container ref={ref} id="header">
      <Nav isHeaderInView={isIntersected} />
      <S.HeaderContainer>
        {post ? (
          <PostHeader
            title={post.title}
            date={post.date}
            excerpt={post.excerpt}
          />
        ) : (
          <S.Heading>moonkorea | Tech Blog</S.Heading>
        )}
      </S.HeaderContainer>
    </S.Container>
  );
};

export default Header;
