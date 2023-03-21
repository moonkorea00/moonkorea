import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllPosts } from '@lib/post/getPost';
import Layout from '@components/common/Layout/Layout';
import SEO from '@components/common/SEO/SEO';
import PreviewPost from '@components/Home/PreviewPost';

interface FrontMatterProps {
  id: string;
  title: string;
  tags: string;
  description: string;
  date: string;
}

const Home = ({ metaData }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Layout>
      <SEO metaData={null} />
      {metaData
        .sort((a: FrontMatterProps, b: FrontMatterProps) =>
          a.date > b.date ? -1 : 1
        )
        .map((postData: FrontMatterProps) => (
          <PreviewPost key={postData.id} postData={postData} />
        ))}
    </Layout>
  );
};
export default Home;

export const getStaticProps = async () => {
  const metaData = getAllPosts();
  return {
    props: { metaData },
  };
};
