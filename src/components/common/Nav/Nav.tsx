import type { MouseEvent } from 'react';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import * as S from './Nav.style';
import Sider from '@components/Sider/Sider';
import OutsideClickWrapper from '../OutsideClickWrapper/OutsideClickWrapper';

import useLockBodyScroll from '@hooks/useLockBodyScroll';

import favicon from 'public/assets/favicon/moonkorea.png';

interface NavProps {
  isHeaderInView: boolean;
}

const Nav = ({ isHeaderInView }: NavProps) => {
  const [isSiderVisible, setIsSiderVisible] = useState(false);
  const siderButtonRef = useRef<HTMLSpanElement | null>(null);

  const onCloseSider = () => setIsSiderVisible(false);

  const toggleSider = (e: MouseEvent) => {
    if (siderButtonRef.current?.contains(e.target as Node) && !isSiderVisible) {
      e.stopPropagation();
      return setIsSiderVisible(prev => !prev);
    }
    setIsSiderVisible(false);
  };

  useLockBodyScroll(isSiderVisible);

  return (
    <>
      <OutsideClickWrapper onClickHandler={onCloseSider} triggerKey="Escape">
        <S.Container isHeaderInView={isHeaderInView} onClick={toggleSider}>
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
              <S.NavItem onClick={toggleSider} ref={siderButtonRef}>
                Posts
              </S.NavItem>
            </S.NavItemsContainer>
          </S.FlexContainer>
        </S.Container>
        <Sider isSiderVisible={isSiderVisible} onCloseSider={onCloseSider} />
      </OutsideClickWrapper>
    </>
  );
};

export default Nav;
