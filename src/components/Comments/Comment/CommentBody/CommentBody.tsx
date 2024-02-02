import type { Comment } from '@@types/comments';

import * as S from './CommentBody.style';
import EditCommentForm from '@components/Comments/CommentForm/EditCommentForm';
import NewCommentForm from '@components/Comments/CommentForm/NewCommentForm';

interface CommentBodyProps {
  comments: Comment;
  isEditMode: boolean;
  isReplyMode: boolean;
  onResetMode: () => void;
}

const CommentBody = ({
  comments,
  isEditMode,
  isReplyMode,
  onResetMode,
}: CommentBodyProps) => {
  const { isDeleted, body } = comments;
  return (
    <>
      <S.CommentBody isDeleted={isDeleted}>
        {isDeleted ? '삭제된 댓글입니다.' : body}
      </S.CommentBody>
      {isEditMode && (
        <EditCommentForm
          comments={comments}
          isEditMode={isEditMode}
          setFormToDefaultMode={onResetMode}
        />
      )}
      {isReplyMode && (
        <NewCommentForm
          comments={comments}
          isReplyMode={isReplyMode}
          setFormToDefaultMode={onResetMode}
        />
      )}
    </>
  );
};

export default CommentBody;
