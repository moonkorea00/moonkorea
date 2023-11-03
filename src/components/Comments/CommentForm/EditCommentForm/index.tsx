/* eslint-disable @typescript-eslint/no-empty-function */
import type { Comment } from '@@types/comments';
import * as S from '../CommentForm.style';
import BaseCommentForm from '../BaseCommentForm';
import useInput from '@hooks/useInput';
import { useEditComment } from '@api/hooks/Comments/mutation';
import { sendNotificationEmail } from '@api/services/notificationEmail';
import { getPostId } from '@components/Comments/Comments.utils';

interface EditCommentFormProps {
  isEditMode: boolean;
  setFormToDefaultMode: () => void;
  comments: Comment;
}

const EditCommentForm = ({
  isEditMode,
  setFormToDefaultMode,
  comments,
}: EditCommentFormProps) => {
  const [edittedComment, handleCommentChange] = useInput<HTMLTextAreaElement>(
    comments?.body as string
  );
  const { mutate, isPending } = useEditComment();
  const postId = getPostId();

  const onEditComment = () => {
    if (edittedComment === comments?.body || !edittedComment) return;
    mutate(
      {
        id: comments.id,
        body: edittedComment,
        postId,
      },
      {
        onSuccess() {
          setFormToDefaultMode();
          sendNotificationEmail({ postId, body: edittedComment });
        },
      }
    );
  };

  const editCommentFormConfig = {
    onSubmit: onEditComment,
    isFormModeCancellable: isEditMode,
    setFormToDefaultMode,
    isSubmitButtonDisabled: isPending,
    submitButtonLabel: '수정',
  };

  return (
    <BaseCommentForm {...editCommentFormConfig}>
      <S.CommentEditInput
        defaultValue={edittedComment}
        onChange={handleCommentChange}
        autoFocus={isEditMode}
      />
    </BaseCommentForm>
  );
};

export default EditCommentForm;
