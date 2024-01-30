import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import * as S from './Nav.style';
import Sider from '@components/Sider/Sider';

import useLockBodyScroll from '@hooks/useLockBodyScroll';

import favicon from 'public/assets/favicon/moonkorea.png';

interface NavProps {
  isHeaderInView: boolean;
}

const Nav = ({ isHeaderInView }: NavProps) => {
  const [isSiderVisible, setIsSiderVisible] = useState(false);

  const onCloseSider = () => setIsSiderVisible(false);

  useLockBodyScroll(isSiderVisible);

  return (
    <>
      <S.Container isHeaderInView={isHeaderInView}>
        <S.FlexContainer>
          <Link href="/">
            <Image
              src={favicon}
              alt="moonkorea 개발 블로그"
              width={30}
              height={30}
            />
          </Link>
          <S.NavItemsContainer>
            <a
              href="https://github.com/moonkorea00"
              aria-label="moonkorea00 GitHub"
              target="_blank"
              rel="noopener"
              style={{
                fontSize: 'inherit',
                color: 'inherit',
              }}
            >
              Github
            </a>
            <S.NavItem onClick={() => setIsSiderVisible(true)}>Posts</S.NavItem>
          </S.NavItemsContainer>
        </S.FlexContainer>
      </S.Container>
      <Sider isSiderVisible={isSiderVisible} onCloseSider={onCloseSider} />
    </>
  );
};

export default Nav;
