import * as S from './NavCategory.style';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Triangle from '../../../assets//icons/Triangle.png';
import NavItem from '../NavItem/NavItem';

const NavCategory = ({ item: { name, variant, posts } }) => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const { pathname } = useLocation();

  const isUserOnSelectedCategory = pathname.split('/')[1] === variant;

  const handleDisplaySubnav = () => {
    setIsSubCategoryOpen(prev => !prev);
  };

  useEffect(() => {
    isUserOnSelectedCategory && setIsSubCategoryOpen(true);
  }, [isUserOnSelectedCategory]);

  return (
    <S.Container>
      <S.CategoryContainer>
        <S.TriangleIcon
          src={Triangle}
          alt="icon"
          condition={isSubCategoryOpen}
          onClick={handleDisplaySubnav}
        />
        <S.CategoryItem
          condition={isUserOnSelectedCategory}
          onClick={handleDisplaySubnav}
        >
          {name} <S.TotalPosts>({posts.length})</S.TotalPosts>
        </S.CategoryItem>
      </S.CategoryContainer>
      {isSubCategoryOpen &&
        posts.map(({ id, title, category, path }) => (
          <NavItem key={id} title={title} category={category} path={path} />
        ))}
    </S.Container>
  );
};

export default NavCategory;
