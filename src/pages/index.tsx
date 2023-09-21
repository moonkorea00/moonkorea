import type { FrontMatter } from '@@types/metaData';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import Metadata from '@components/common/Metadata/Metadata';
import PreviewPost from '@components/Home/PreviewPost';
import { getAllPosts } from '@api/services/post';

interface HomePageProps {
  postFrontMatter: FrontMatter[];
}

const Home = ({ postFrontMatter }: HomePageProps) => {
  return (
    <>
      <Metadata />
      {postFrontMatter
        .sort((a: FrontMatter, b: FrontMatter) => (a.date > b.date ? -1 : 1))
        .map((frontMatter: FrontMatter) => (
          <PreviewPost key={frontMatter.id} {...frontMatter} />
        ))}
    </>
  );
};

export default Home;

Home.getLayout = DefaultLayout;

export const getStaticProps = async () => {
  const postFrontMatter = getAllPosts();
  return {
    props: { postFrontMatter },
  };
};
