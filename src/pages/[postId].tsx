import type { MetaData } from '@@types/metaData';
import { Suspense, useRef } from 'react';
import DefaultLayout from '@components/common/Layout/DefaultLayout/DefaultLayout';
import Metadata from '@components/common/Metadata/Metadata';
import Markdown from '@components/Markdown';
import { CommentSectionPlaceholder } from '@components/Comments/CommentSection.style';
import CommentSection from '@components/Comments/CommentSection';
import CommentSectionLoader from '@components/Comments/Loader/Loader';
import PostSider from '@components/PostSider/PostSider';
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
        <Suspense fallback={<CommentSectionLoader />}>
          <CommentSection />
        </Suspense>
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
