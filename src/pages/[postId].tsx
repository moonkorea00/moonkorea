import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRef } from 'react';
import Layout from '@components/common/Layout/Layout';
import SEO from '@components/common/SEO/SEO';
import Markdown from '@components/Markdown';
import { CommentSectionPlaceholder } from '@components/Comments/CommentSection.style.';
import CommentSection from '@components/Comments/CommentSection';
import PostSider from '@components/PostSider/PostSider';
import { getPostPaths, getPostById } from '@api/services/post';
import useIsIntersected from '@hooks/useIsIntersected';

interface PostPageProps {
  params: {
    postId: string;
  };
}

const Post = ({ metaData }: InferGetStaticPropsType<GetStaticProps>) => {
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const isIntersected = useIsIntersected(commentSectionRef, {
    once: true,
  });

  return (
    <Layout metaData={metaData} pageType="post">
      <SEO metaData={metaData} />
      <Markdown content={metaData.content} />
      <CommentSectionPlaceholder
        id="comment-section"
        isIntersected={isIntersected}
        ref={commentSectionRef}
      />
      {isIntersected && <CommentSection />}
      <PostSider metaData={metaData} />
    </Layout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = getPostPaths();
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: PostPageProps) => {
  const metaData = await getPostById(params.postId);
  return {
    props: { metaData },
  };
};
