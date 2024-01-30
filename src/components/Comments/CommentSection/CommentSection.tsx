import * as S from './CommentSection.style';
import NewCommentForm from '../CommentForm/NewCommentForm';
import CommentList from '../CommentList/CommentList';

import { useGetComments } from '@api/hooks/Comments/query';

import { getPostId } from '../Comments.utils';

const CommentSection = () => {
  const postId = getPostId();
  const { data: comments } = useGetComments(postId);

  return (
    <S.Container>
      <S.CommentCount>{comments?.data.total_comments}개 댓글</S.CommentCount>
      <NewCommentForm />
      <CommentList comments={comments?.data.comments} />
    </S.Container>
  );
};

export default CommentSection;
