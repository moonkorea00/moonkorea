import * as S from './Nav.style';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <S.FlexBox isHeaderInView={isHeaderInView}>
          <Link href="/">
            <S.LogoContainer isHeaderInView={isHeaderInView}>
              <Image
                src={favicon}
                alt="moonkorea"
                width={30}
                height={30}
              ></Image>
              <S.BlogName>moonkorea</S.BlogName>
            </S.LogoContainer>
          </Link>
          <S.NavBar>
            <S.NavItem>
              <a
                href="https://github.com/moonkorea00"
                aria-label="moonkorea00 GitHub"
                target="_blank"
                style={S.Style}
              >
                GITHUB
              </a>
            </S.NavItem>
            <S.NavItem onClick={() => setIsSiderVisible(true)}>
              CATEGORIES
            </S.NavItem>
          </S.NavBar>
        </S.FlexBox>
      </S.Container>
      <Sider
        isSiderVisible={isSiderVisible}
        onCloseSider={onCloseSider}
      />
    </>
  );
};

export default Nav;
