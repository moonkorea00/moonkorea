import * as S from './NavCategory.style';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NavItem from '../NavItem/NavItem';
import useExpandAndCollapse from '../hooks/useExpandAndCollapse';
import { assets } from '@utils/assetsPath';

interface NavItem {
  title: string;
  path: string;
}

interface CategoryProps {
  name: string;
  posts: NavItem[];
  onCloseSider: () => void;
}

const NavCategory = ({ name, posts, onCloseSider }: CategoryProps) => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const { asPath } = useRouter();

  const onToggleSubnav = () => setIsSubCategoryOpen(prev => !prev);

  const isUserOnSelectedCategory = posts.some(
    post => `/${post.path}` === decodeURI(asPath)
  );

  const { containerHeight, ref: navItemContainerRef } = useExpandAndCollapse<
    HTMLDivElement,
    VoidFunction
  >(isUserOnSelectedCategory, () => setIsSubCategoryOpen(true));

  return (
    <S.Container>
      <S.CategoryContainer>
        <Image
          src={assets.triangle}
          alt="triangle"
          onClick={onToggleSubnav}
          width={7}
          height={7}
          style={{
            transform: isSubCategoryOpen ? '' : 'rotate(-90deg)',
            transition: 'all ease 0.3s',
            cursor: 'pointer',
          }}
        />
        <S.CategoryItem
          isActive={isUserOnSelectedCategory}
          onClick={onToggleSubnav}
        >
          <S.Title>{name}</S.Title>
          <S.TotalPosts>({posts.length})</S.TotalPosts>
        </S.CategoryItem>
      </S.CategoryContainer>
      <S.NavItemContainer
        isSubCategoryOpen={isSubCategoryOpen}
        height={containerHeight}
        ref={navItemContainerRef}
      >
        {posts.map(post => (
          <NavItem key={post.title} {...post} onCloseSider={onCloseSider} />
        ))}
      </S.NavItemContainer>
    </S.Container>
  );
};

export default NavCategory;
