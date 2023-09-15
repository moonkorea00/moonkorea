import type { FrontMatter } from '@@types/metaData';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import SEO from '@components/common/SEO/SEO';
import PreviewPost from '@components/Home/PreviewPost';
import { getAllPosts } from '@api/services/post';

interface HomeProps {
  postFrontMatter: FrontMatter[];
}

const Home = ({ postFrontMatter }: HomeProps) => {
  return (
    <>
      <SEO />
      {postFrontMatter
        .sort((a: FrontMatter, b: FrontMatter) => (a.date > b.date ? -1 : 1))
        .map((postData: FrontMatter) => (
          <PreviewPost key={postData.id} {...postData} />
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
