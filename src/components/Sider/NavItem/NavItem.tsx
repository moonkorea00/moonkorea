import * as S from './NavItem.style';
import Link from 'next/link';
import { getPostId } from '@components/Comments/Comments.utils';

interface NavItemProps {
  title: string;
  path: string;
}

const NavItem = ({ title, path }: NavItemProps) => {
  const postId = getPostId();
  const isPostSelected = postId === path;

  return (
    <S.Container isPostSelected={isPostSelected}>
      -
      <Link href={`/${path}`}>
        <S.PostTitle>{title}</S.PostTitle>
      </Link>
    </S.Container>
  );
};

export default NavItem;
