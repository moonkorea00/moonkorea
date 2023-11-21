import type { GetStaticPropsContext } from 'next';
import type { FrontMatter } from '@@types/metaData';

import Metadata from '@components/common/Metadata/Metadata';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import PreviewPost from '@components/Home/PreviewPost';
import Pagination from '@components/Pagination/Pagination';

import { getPagePaths, getPostsByPage } from '@api/services/post';

interface PageProps {
  posts: FrontMatter[];
  pages: number[];
}

const Page = ({ posts, pages }: PageProps) => {
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

export default Page;

Page.getLayout = DefaultLayout;

type PageParams = {
  page: string;
};

export const getStaticPaths = async () => {
  const paths = getPagePaths();

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>) => {
  if (!params) return;

  const { posts, pages } = getPostsByPage(Number(params.page));

  return {
    props: { posts, pages },
  };
};
