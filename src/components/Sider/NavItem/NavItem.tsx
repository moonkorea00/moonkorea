import * as S from './NavItem.style';
import { useSetRecoilState } from 'recoil';
import Link from 'next/link';
import { siderState } from '@store/siderState';

interface NavItemProps {
  title: string;
  path: string;
}

const NavItem = ({ title, path }: NavItemProps) => {
  const setIsSiderVisible = useSetRecoilState(siderState);

  const isPostSelected = decodeURI(window.location.pathname.slice(1)) === path;

  return (
    <S.Container isPostSelected={isPostSelected}>
      -
      <Link href={`/${path}`} onClick={() => setIsSiderVisible(false)}>
        <S.PostTitle>{title}</S.PostTitle>
      </Link>
    </S.Container>
  );
};

export default NavItem;
