import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Suspense, useRef } from 'react';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import SEO from '@components/common/SEO/SEO';
import Markdown from '@components/Markdown';
import { CommentSectionPlaceholder } from '@components/Comments/CommentSection.style';
import CommentSection from '@components/Comments/CommentSection';
import CommentSectionLoader from '@components/Comments/Loader/Loader';
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
    <>
      <SEO metaData={metaData} />
      <Markdown content={metaData.content} />
      <CommentSectionPlaceholder
        id="comment-section"
        isIntersected={isIntersected}
        ref={commentSectionRef}
      />
      {isIntersected && (
        <Suspense fallback={<CommentSectionLoader />}>
          <CommentSection />
        </Suspense>
      )}
      <PostSider metaData={metaData} />
    </>
  );
};

export default Post;

Post.getLayout = DefaultLayout;
Post.pageType = 'post';

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
