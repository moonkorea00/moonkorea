import type { GetStaticPropsContext } from 'next';
import type { Post } from '@@types/post';
import type { ImageSizes } from '@api/image';
import type { TableOfContents } from '@components/TableOfContents/types';

import { Suspense } from 'react';
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

import { getPostPaths, getPostById } from '@api/post';

import useIsIntersected from '@hooks/useIsIntersected';

interface PostPageProps {
  post: Post & {
    imageSizes: ImageSizes;
    toc: TableOfContents;
  };
}

const PostPage = ({ post }: PostPageProps) => {
  const { title, description, content, imageSizes } = post;
  const { isIntersected: isCommentSectionInView, ref } = useIsIntersected({
    once: true,
  });
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Metadata metaData={post} />
      <Markdown content={content} imageSizes={imageSizes} />
      <CommentSectionPlaceholder
        id="comment-section"
        isIntersected={isCommentSectionInView}
        ref={ref}
      />
      {isCommentSectionInView && (
        <ErrorBoundary onReset={reset} fallback={RetryFallback}>
          <Suspense fallback={<CommentSectionLoader />}>
            <CommentSection />
          </Suspense>
        </ErrorBoundary>
      )}
      <PostSider title={title} description={description} />
    </>
  );
};

export default PostPage;

PostPage.getLayout = DefaultLayout;
PostPage.pageType = 'post';

type PostParams = {
  postId: string;
};

export const getStaticPaths = async () => {
  const paths = getPostPaths();

  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<PostParams>) => {
  if (!params) return;

  const post = await getPostById(params.postId);

  return {
    props: { post },
  };
};
