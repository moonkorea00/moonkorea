import type { FrontMatter } from '@@types/metaData';

import Metadata from '@components/common/Metadata/Metadata';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import PostList from '@components/Home/PostList/PostList';
import PostFilter from '@components/Home/PostFilter/PostFilter';

import { getAllPostsSortedByDate, getPostTags } from '@api/post';
import usePostFilter from '@hooks/usePostFilter';

interface HomePageProps {
  posts: FrontMatter[];
  tags: Record<string, number>;
}

const Home = ({ posts, tags }: HomePageProps) => {
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

export default Home;

Home.getLayout = DefaultLayout;

export const getStaticProps = async () => {
  const posts = getAllPostsSortedByDate();
  const tags = getPostTags();

  return {
    props: { posts, tags },
  };
};
