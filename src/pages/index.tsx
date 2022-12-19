import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@utils/api';
import PreviewPost from '@components/Home/PreviewPost';

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
    <>
      {metaData.map(({ id, date, title, excerpt }: FrontMatterProps) => (
        <PreviewPost
          key={id}
          id={id}
          date={date}
          title={title}
          excerpt={excerpt}
        />
      ))}
    </>
  );
};
export default Home;

export const getStaticProps = async () => {
  const metaData = getAllPosts();
  return {
    props: { metaData },
  };
};
