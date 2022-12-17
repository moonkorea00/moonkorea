import * as S from './NavItem.style';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface NavItemProps {
  title: string;
  path: string;
}

const NavItem = ({ title, path }: NavItemProps) => {
  const { asPath } = useRouter();
  const isPostSelected = decodeURI(asPath).split('/').includes(path);

  return (
    <S.PostContainer isPostSelected={isPostSelected}>
      -
      <Link href={`/${path}`}>
        <S.PostTitle>{title}</S.PostTitle>
      </Link>
    </S.PostContainer>
  );
};

export default NavItem;
