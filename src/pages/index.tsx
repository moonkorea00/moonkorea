import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getAllPosts } from '@lib/getPost';
import SEO from '@components/common/SEO/SEO';
import ArticleLayout from '@components/common/ArticleLayout/ArticleLayout';
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
    <ArticleLayout>
      <SEO metaData={metaData} />
      {metaData
        .sort((a: FrontMatterProps, b: FrontMatterProps) =>
          a.date > b.date ? -1 : 1
        )
        .map((postData: FrontMatterProps) => (
          <PreviewPost key={postData.id} postData={postData} />
        ))}
    </ArticleLayout>
  );
};
export default Home;

export const getStaticProps = async () => {
  const metaData = getAllPosts();
  return {
    props: { metaData },
  };
};
