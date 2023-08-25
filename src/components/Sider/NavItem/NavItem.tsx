import * as S from './NavItem.style';
import Link from 'next/link';
import { getPostId } from '@components/Comments/Comments.utils';

interface NavItemProps {
  title: string;
  path: string;
  onCloseSider: () => void;
}

const NavItem = ({ title, path, onCloseSider }: NavItemProps) => {
  const postId = getPostId();
  const isPostSelected = postId === path;

  return (
    <S.Container isPostSelected={isPostSelected}>
      -
      <Link href={`/${path}`}>
        <S.PostTitle onClick={onCloseSider}>{title}</S.PostTitle>
      </Link>
    </S.Container>
  );
};

export default NavItem;
