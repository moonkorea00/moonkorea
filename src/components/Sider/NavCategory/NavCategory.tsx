import * as S from './NavCategory.style';
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NavItem from '../NavItem/NavItem';
import { assets } from '@utils/assetsPath';

interface ItemProps {
  title: string;
  category: string;
  path: string;
  date: string;
}

interface CategoryProps {
  item: { name: string; posts: ItemProps[] };
  onCloseSider: () => void;
}

const NavCategory = ({
  item: { name, posts },
  onCloseSider,
}: CategoryProps) => {
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const navItemContainerRef = useRef<HTMLDivElement>(null);
  const { asPath } = useRouter();

  const isUserOnSelectedCategory = posts.some(
    post => `/${post.path}` === decodeURI(asPath)
  );

  const onToggleSubnav = () => setIsSubCategoryOpen(prev => !prev);

  useEffect(() => {
    isUserOnSelectedCategory && setIsSubCategoryOpen(true);
    if (navItemContainerRef.current) {
      const currentContainerHeight = navItemContainerRef.current.scrollHeight;
      setContainerHeight(currentContainerHeight);
    }
  }, [isUserOnSelectedCategory]);

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
          condition={isUserOnSelectedCategory}
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
        {posts.map(({ title, path }: ItemProps, idx) => (
          <NavItem
            key={idx}
            title={title}
            path={`/${path}`}
            onCloseSider={onCloseSider}
          />
        ))}
      </S.NavItemContainer>
    </S.Container>
  );
};

export default NavCategory;
