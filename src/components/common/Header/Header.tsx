import * as S from './Header.style';
import * as Gr from 'react-icons/gr';
import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import useResizeSider from '@hooks/useResizeSider';
import favicon from 'public/assets/favicon/moonkorea.png';

const Header = () => {
  const { isSiderVisible } = useResizeSider();
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
            {isSiderVisible && <Gr.GrMenu />}
            <Gr.GrGithub />
          </a>
          <S.Copyright>&copy; {TITLE}</S.Copyright>
        </S.LinkContainer>
      </S.Container>
    </IconContext.Provider>
  );
};

export default Header;
