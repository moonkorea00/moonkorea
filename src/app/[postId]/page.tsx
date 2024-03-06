import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
  const post = await getPostById(postId);

  if (!post) return {};

  const { title, description } = post;

  const ogUrl = `/${decodeURI(postId)}`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}&type=post`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: ogUrl,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [
        {
          url: ogImageUrl,
        },
      ],
    },
  };
};

export const generateStaticParams = async () => getPostPaths();

const PostPage = async ({ params: { postId } }: PostPageProps) => {
  const post = await getPostById(postId);

  if (!post) notFound();

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
