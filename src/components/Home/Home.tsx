'use client';

import type { HomePost } from '@@types/post';

import Main from '@components/common/Layout/Main/Main';
import PostFilter from './PostFilter/PostFilter';
import PostList from './PostList/PostList';

import usePostFilter from '@hooks/usePostFilter';

interface HomeProps {
  posts: HomePost[];
  tags: Record<string, number>;
}

const Home = ({ posts, tags }: HomeProps) => {
  const {
    filteredPosts,
    isResettable,
    isOptionSelected,
    onSetFilter,
    onResetFilter,
  } = usePostFilter(posts);

  return (
    <Main>
      <PostFilter
        options={tags}
        isResettable={isResettable}
        isOptionSelected={isOptionSelected}
        onSetFilter={onSetFilter}
        onResetFilter={onResetFilter}
      />
      <PostList posts={filteredPosts} />
    </Main>
  );
};

export default Home;
