import type { FrontMatter } from '@@types/metaData';

import Metadata from '@components/common/Metadata/Metadata';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import PreviewPost from '@components/Home/PreviewPost';
import Pagination from '@components/Pagination/Pagination';

import { getPostsByPage } from '@api/services/post';

interface HomePageProps {
  posts: FrontMatter[];
  pages: number[];
}

const Home = ({ posts, pages }: HomePageProps) => {
  return (
    <>
      <Metadata />
      {posts.map((post: FrontMatter) => (
        <PreviewPost key={post.id} {...post} />
      ))}
      <Pagination pages={pages} />
    </>
  );
};

export default Home;

Home.getLayout = DefaultLayout;

export const getStaticProps = async () => {
  const { posts, pages } = getPostsByPage(1);

  return {
    props: { posts, pages },
  };
};
