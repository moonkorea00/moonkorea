import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@utils/api';
import PreviewPost from '@components/Home/PreviewPost';
import ArticleLayout from '@components/common/ArticleLayout/ArticleLayout';

interface FrontMatterProps {
  id: string;
  date: string;
  title: string;
  excerpt: string;
}
const Home = ({
  metaData,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  return (
    <ArticleLayout>
      {metaData.map(({ id, date, title, excerpt }: FrontMatterProps) => (
        <PreviewPost
          key={id}
          id={id}
          date={date}
          title={title}
          excerpt={excerpt}
        />
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
