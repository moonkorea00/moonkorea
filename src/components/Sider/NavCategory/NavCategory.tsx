import * as S from './NavCategory.style';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Triangle from 'public/assets/sider/Triangle.png';
import NavItem from '../NavItem/NavItem';

interface ItemProps {
  title: string;
  category: string;
  path: string;
  date: string;
}

interface CategoryProps {
  item: { name: string; variant: string; posts: ItemProps[] };
}

const NavCategory = ({ item: { name, variant, posts } }: CategoryProps) => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const { asPath } = useRouter();

  const isUserOnSelectedCategory =
    asPath.split('/')[1].split('-')[0] === variant;
    
  const handleDisplaySubnav = () => {
    setIsSubCategoryOpen(prev => !prev);
  };

  useEffect(() => {
    isUserOnSelectedCategory && setIsSubCategoryOpen(true);
  }, [isUserOnSelectedCategory]);

  return (
    <S.Container>
      <S.CategoryContainer>
        <Image
          src={Triangle}
          alt="triangle icon"
          onClick={handleDisplaySubnav}
          width={7}
          height={7}
          style={{
            transform: isSubCategoryOpen ? '' : 'rotate(-90deg)',
            transition: 'all ease 0.3s',
            cursor: 'pointer',
          }}
        />
        <S.CategoryItem
          condition={isUserOnSelectedCategory}
          onClick={handleDisplaySubnav}
        >
          <S.Title>{name}</S.Title>
          <S.TotalPosts>({posts.length})</S.TotalPosts>
        </S.CategoryItem>
      </S.CategoryContainer>
      {isSubCategoryOpen &&
        posts.map(({ title, path }: ItemProps, idx) => (
          <NavItem key={idx} title={title} path={path} />
        ))}
    </S.Container>
  );
};

export default NavCategory;
