import type { FrontMatter } from '@@types/metaData';

import Metadata from '@components/common/Metadata/Metadata';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import PostList from '@components/Home/PostList/PostList';
import PostFilter from '@components/Home/PostFilter/PostFilter';

import { getAllPostsSortedByDate, getPostTags } from '@api/services/post';
import useSearchParams from '@hooks/useSearchParams';

interface HomePageProps {
  posts: FrontMatter[];
  tags: { tag: string; count: number }[];
}

const Home = ({ posts, tags }: HomePageProps) => {
  const { query, set, clear } = useSearchParams();

  const filteredPosts = query.tags?.length
    ? posts.filter(post =>
        post.tags.split(', ').some(tag => query.tags?.includes(tag))
      )
    : posts;

  return (
    <>
      <Metadata />
      <PostFilter
        tags={tags}
        selectedTags={query.tags}
        toggleTag={set}
        reset={clear}
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
