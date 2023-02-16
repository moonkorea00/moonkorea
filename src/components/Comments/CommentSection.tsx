import * as S from './CommentSection.style.';
import { useQuery } from '@tanstack/react-query';
import CommentForm from './CommentForm/CommentForm';
import CommentList from './CommentList/CommentList';
import { readComments } from '@lib/comment';
import { getPostId } from './Comments.utils';

const CommentSection = () => {
  const postId = getPostId();

  const { data: comments } = useQuery(['comments', postId], readComments);

  return (
    <S.Container>
      {comments?.data && (
        <S.CommentCount>{comments.data.total_comments}개 댓글</S.CommentCount>
      )}
      <CommentForm type="new_comment" />
      <CommentList comments={comments?.data.comments} />
    </S.Container>
  );
};

export default CommentSection;
