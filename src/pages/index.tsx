import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@utils/api';
import PreviewPost from '@components/Home/PreviewPost';
import { ArticleContainer } from '@components/common/Article/ArticleContainer';

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
    <ArticleContainer>
      {metaData.map(({ id, date, title, excerpt }: FrontMatterProps) => (
        <PreviewPost
          key={id}
          id={id}
          date={date}
          title={title}
          excerpt={excerpt}
        />
      ))}
    </ArticleContainer>
  );
};
export default Home;

export const getStaticProps = async () => {
  const metaData = getAllPosts();
  return {
    props: { metaData },
  };
};
