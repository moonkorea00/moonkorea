import * as S from './NavItem.style';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { getPostId } from '@components/Comments/Comments.utils';

interface NavItemProps {
  title: string;
  path: string;
  setIsSiderVisible: Dispatch<SetStateAction<boolean>>;
}

const NavItem = ({ title, path, setIsSiderVisible }: NavItemProps) => {
  const postId = getPostId();
  const isPostSelected = postId === path;

  return (
    <S.Container isPostSelected={isPostSelected}>
      -
      <Link href={`/${path}`}>
        <S.PostTitle onClick={() => setIsSiderVisible(prev => !prev)}>
          {title}
        </S.PostTitle>
      </Link>
    </S.Container>
  );
};

export default NavItem;
