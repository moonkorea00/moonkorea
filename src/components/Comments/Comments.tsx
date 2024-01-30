'use client';

import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { CommentSectionPlaceholder } from './CommentSection/CommentSection.style';
import CommentSection from './CommentSection/CommentSection';
import CommentSectionLoader from './Loader/Loader';
import { ErrorBoundary, RetryFallback } from '@components/common/ErrorBoundary';

import useIsIntersected from '@hooks/useIsIntersected';

const Comments = () => {
  const { isIntersected: isCommentSectionInView, ref } = useIsIntersected({
    once: true,
  });
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
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
    </>
  );
};

export default Comments;
