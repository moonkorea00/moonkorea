import * as S from './NavItem.style';
import { useLocation, useNavigate } from 'react-router-dom';

const NavItem = ({ title, category, path }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isPostSelected = decodeURI(pathname).split('/').includes(path);

  return (
    <S.PostContainer isPostSelected={isPostSelected}>
      -
      <S.PostTitle onClick={() => navigate(`/${category}/${path}`)}>
        {title}
      </S.PostTitle>
    </S.PostContainer>
  );
};

export default NavItem;
