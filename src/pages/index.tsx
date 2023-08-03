import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { FrontMatter } from '@@types/metaData';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import SEO from '@components/common/SEO/SEO';
import PreviewPost from '@components/Home/PreviewPost';
import { getAllPosts } from '@api/services/post';

const Home = ({ metaData }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <>
      <SEO />
      {metaData
        .sort((a: FrontMatter, b: FrontMatter) => (a.date > b.date ? -1 : 1))
        .map((postData: FrontMatter) => (
          <PreviewPost key={postData.id} postData={postData} />
        ))}
    </>
  );
};

export default Home;

Home.getLayout = DefaultLayout;

export const getStaticProps = async () => {
  const metaData = getAllPosts();
  return {
    props: { metaData },
  };
};
