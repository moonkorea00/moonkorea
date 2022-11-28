import * as S from './Header.style';
import * as FaIcons from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import favicon from '../../../assets/icons/moonkorea.png';

const Header = () => {
  const navigate = useNavigate();
  const TITLE = 'moonkorea';

  return (
    <IconContext.Provider value={S.customIconStyle}>
      <S.HeaderContainer>
        <S.LogoContainer onClick={() => navigate('/')}>
          <S.Favicon src={favicon} alt={TITLE}></S.Favicon>
          <S.BlogTitle>{TITLE}</S.BlogTitle>
        </S.LogoContainer>
        <S.Links>
          <a
            href="https://github.com/moonkorea00"
            target="_blank"
            rel="noreferrer"
          >
            <FaIcons.FaGithub />
          </a>
          <S.Copyright>
            &copy; {TITLE} {new Date().getFullYear()}
          </S.Copyright>
        </S.Links>
      </S.HeaderContainer>
    </IconContext.Provider>
  );
};

export default Header;
