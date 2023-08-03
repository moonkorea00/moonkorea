import * as S from './CommentSection.style.';
import CommentList from './CommentList/CommentList';
import { useGetComments } from '@api/hooks/Comments/query';
import { getPostId } from './Comments.utils';
import NewCommentForm from './CommentForm/NewCommentForm';

const CommentSection = () => {
  const postId = getPostId();
  const { data: comments } = useGetComments(postId);

  return (
    <S.Container>
      {comments?.data && (
        <S.CommentCount>{comments.data.total_comments}개 댓글</S.CommentCount>
      )}
      <NewCommentForm />
      {comments?.data && <CommentList comments={comments?.data.comments} />}
    </S.Container>
  );
};

export default CommentSection;
