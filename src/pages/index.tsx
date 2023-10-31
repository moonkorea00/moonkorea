import type { FrontMatter } from '@@types/metaData';

import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import Metadata from '@components/common/Metadata/Metadata';
import PreviewPost from '@components/Home/PreviewPost';

import { getAllPostsSortedByDate } from '@api/services/post';

interface HomePageProps {
  posts: FrontMatter[];
}

const Home = ({ posts }: HomePageProps) => {
  return (
    <>
      <Metadata />
      {posts.map((post: FrontMatter) => (
        <PreviewPost key={post.id} {...post} />
      ))}
    </>
  );
};

export default Home;

Home.getLayout = DefaultLayout;

export const getStaticProps = async () => {
  const posts = getAllPostsSortedByDate();

  return {
    props: { posts },
  };
};
