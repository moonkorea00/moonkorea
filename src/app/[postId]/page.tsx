import { Metadata } from 'next';

import Header from '@components/common/Header/Header';
import TableOfContents from '@components/TableOfContents/TableOfContents';
import Main from '@components/common/Layout/Main/Main';
import Markdown from '@components/Markdown';
import Comments from '@components/Comments/Comments';
import PostSider from '@components/PostSider/PostSider';

import { getPostById, getPostPaths } from '@api/post';

interface PostPageProps {
  params: { postId: string };
}

export const generateMetadata = async ({
  params: { postId },
}: PostPageProps): Promise<Metadata> => {
  const { title, description } = await getPostById(postId);

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `/${decodeURI(postId)}`,
      title,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&type=post`,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&type=post`,
        },
      ],
    },
  };
};

export const generateStaticParams = async () => getPostPaths();

const PostPage = async ({ params: { postId } }: PostPageProps) => {
  const post = await getPostById(postId);
  const { title, description, content, toc, imageProps } = post;

  return (
    <>
      <Header post={post} />
      <TableOfContents toc={toc} />
      <Main>
        <Markdown content={content} imageProps={imageProps} />
        <Comments />
        <PostSider title={title} description={description} />
      </Main>
    </>
  );
};

export default PostPage;
