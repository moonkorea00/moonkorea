import type { HomePost } from '@@types/post';

import Metadata from '@components/common/Metadata/Metadata';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import PostList from '@components/Home/PostList/PostList';
import PostFilter from '@components/Home/PostFilter/PostFilter';

import { getAllPostsSortedByDate, getPostTags } from '@api/post';
import usePostFilter from '@hooks/usePostFilter';

interface HomePageProps {
  posts: HomePost[];
  tags: Record<string, number>;
}

const HomePage = ({ posts, tags }: HomePageProps) => {
  const {
    filteredPosts,
    selectedOptions,
    isOptionSelected,
    onSetFilter,
    onResetFilter,
  } = usePostFilter(posts);

  return (
    <>
      <Metadata />
      <PostFilter
        options={tags}
        selectedOptions={selectedOptions}
        isOptionSelected={isOptionSelected}
        onSetFilter={onSetFilter}
        onResetFilter={onResetFilter}
      />
      <PostList posts={filteredPosts} />
    </>
  );
};

export default HomePage;

HomePage.getLayout = DefaultLayout;

export const getStaticProps = async () => {
  const posts = getAllPostsSortedByDate();
  const tags = getPostTags();

  return {
    props: { posts, tags },
  };
};
