import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import * as S from './SiderCategory.style';
import SiderItem from '../SiderItem/SiderItem';

import useExpandAndCollapse from '../hooks/useExpandAndCollapse';

import { assets } from '@utils/assetsPath';

interface SiderItem {
  title: string;
  path: string;
}

interface CategoryProps {
  name: string;
  posts: SiderItem[];
  onCloseSider: () => void;
}

const SiderCategory = ({ name, posts, onCloseSider }: CategoryProps) => {
  const { postId }: { postId: string } = useParams();
  const [isCategoryOpen, setIsCategoryOpen] = useState(
    posts.some(post => post.path === decodeURI(postId))
  );

  const { containerHeight, ref: navItemContainerRef } = useExpandAndCollapse<
    HTMLDivElement,
    VoidFunction
  >(isCategoryOpen, () => setIsCategoryOpen(true));

  const onToggleSubnav = () => setIsCategoryOpen(prev => !prev);

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
            transform: isCategoryOpen ? '' : 'rotate(-90deg)',
            transition: 'all ease 0.3s',
            cursor: 'pointer',
          }}
        />
        <S.Category isActive={isCategoryOpen} onClick={onToggleSubnav}>
          <span>{name}</span>
          <S.TotalPosts>({posts.length})</S.TotalPosts>
        </S.Category>
      </S.CategoryContainer>
      <S.CategoryItemContainer
        isCategoryOpen={isCategoryOpen}
        height={containerHeight}
        ref={navItemContainerRef}
      >
        {posts.map(({ title, path }) => (
          <SiderItem
            key={title}
            title={title}
            path={path}
            isSiderItemActive={path === decodeURI(postId)}
            onCloseSider={onCloseSider}
          />
        ))}
      </S.CategoryItemContainer>
    </S.Container>
  );
};

export default SiderCategory;
