import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@utils/api';

interface FrontMatterProps {
  id: string;
  date: string;
  title: string;
}
const Home = ({
  metaData,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  return (
    <section>
        {metaData.map(({ id, date, title }: FrontMatterProps) => (
          <>
            <div>{date}</div>
            <Link href={`/${id}`}>
              <div>{title}</div>
            </Link>
          </>
        ))}
    </section>
  );  
};
export default Home;

export const getStaticProps = async () => {
  const metaData = getAllPosts();
  return {
    props: { metaData },
  };
};