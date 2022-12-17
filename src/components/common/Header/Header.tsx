import * as S from './Header.style';
import * as FaIcons from 'react-icons/fa';
import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import favicon from 'public/assets/favicon/moonkorea.png';

const Header = () => {
  const TITLE = 'moonkorea';

  return (
    <IconContext.Provider value={S.customIconStyle}>
      <S.Container>
        <Link href="/">
          <S.LogoContainer>
            <Image src={favicon} alt={TITLE} width={25} height={25}></Image>
            <S.BlogTitle>{TITLE}</S.BlogTitle>
          </S.LogoContainer>
        </Link>
        <S.LinkContainer>
          <a
            href="https://github.com/moonkorea00"
            target="_blank"
            rel="noreferrer"
          >
            <FaIcons.FaGithub />
          </a>
          <S.Copyright>&copy; {TITLE}</S.Copyright>
        </S.LinkContainer>
      </S.Container>
    </IconContext.Provider>
  );
};

export default memo(Header);
