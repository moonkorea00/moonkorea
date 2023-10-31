import type { MetaData } from '@@types/metaData';

import { Suspense, useRef } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import Metadata from '@components/common/Metadata/Metadata';
import Markdown from '@components/Markdown';
import {
  CommentSection,
  CommentSectionLoader,
  CommentSectionPlaceholder,
} from '@components/Comments';
import PostSider from '@components/PostSider/PostSider';
import { ErrorBoundary, RetryFallback } from '@components/common/ErrorBoundary';

import { getPostPaths, getPostById } from '@api/services/post';

import useIsIntersected from '@hooks/useIsIntersected';

interface PostPageProps {
  postFrontMatter: MetaData & { content: string };
}

const Post = ({ postFrontMatter }: PostPageProps) => {
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const isCommentSectionInView = useIsIntersected(commentSectionRef, {
    once: true,
  });

  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Metadata metaData={postFrontMatter} />
      <Markdown content={postFrontMatter.content} />
      <CommentSectionPlaceholder
        id="comment-section"
        isIntersected={isCommentSectionInView}
        ref={commentSectionRef}
      />
      {isCommentSectionInView && (
        <ErrorBoundary onReset={reset} fallback={RetryFallback}>
          <Suspense fallback={<CommentSectionLoader />}>
            <CommentSection />
          </Suspense>
        </ErrorBoundary>
      )}
      <PostSider postFrontMatter={postFrontMatter} />
    </>
  );
};

export default Post;

Post.getLayout = DefaultLayout;
Post.pageType = 'post';

interface PostParams {
  params: {
    postId: string;
  };
}

export const getStaticPaths = async () => {
  const paths = getPostPaths();

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: PostParams) => {
  const postFrontMatter = await getPostById(params.postId);

  return {
    props: { postFrontMatter },
  };
};
