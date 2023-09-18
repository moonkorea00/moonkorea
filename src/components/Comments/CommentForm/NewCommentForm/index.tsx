/* eslint-disable @typescript-eslint/no-empty-function */
import type { CommentProps } from '@@types/comments';
import * as S from '../CommentForm.style';
import { useSession } from 'next-auth/react';
import BaseCommentForm from '../BaseCommentForm';
import useInput from '@hooks/useInput';
import { useCreateComment } from '@api/hooks/Comments/mutation';
import useModal from '@hooks/useModal';
import { sendNotificationEmail } from '@api/services/notificationEmail';
import { getPostId } from '@components/Comments/Comments.utils';

interface NewCommentFormProps {
  isReplyMode?: boolean;
  onExitReplyMode?: () => void;
  comments?: CommentProps;
}

const NewCommentForm = ({
  isReplyMode,
  onExitReplyMode = () => {},
  comments,
}: NewCommentFormProps) => {
  const [comment, handleCommentChange, resetInput] =
    useInput<HTMLTextAreaElement>('');
  const { data: session } = useSession();
  const { showModal } = useModal();

  const { mutate, isLoading } = useCreateComment();
  const postId = getPostId();

  const onCreateComment = () => {
    if (!comment) return;
    mutate(
      {
        postId,
        body: comment,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        userId: session?.user?.id,
        userEmail: session?.user?.email as string,
        parentId: comments?.id,
      },
      {
        onSuccess() {
          resetInput();
          onExitReplyMode();
          sendNotificationEmail({ postId, body: comment });
        },
      }
    );
  };

  const newCommentFormConfig = {
    onSubmit: session ? onCreateComment : () => showModal({ name: 'login' }),
    isFormModeCancellable: isReplyMode,
    setFormToDefaultMode: onExitReplyMode,
    isSubmitButtonDisabled: isLoading,
    submitButtonLabel: session
      ? isReplyMode
        ? '답글 작성'
        : '댓글 작성'
      : '간편 로그인',
  };

  return (
    <BaseCommentForm {...newCommentFormConfig}>
      <S.CommentInput
        value={comment}
        onChange={handleCommentChange}
        placeholder={
          session
            ? isReplyMode
              ? '답글 작성하기 ..'
              : '댓글 작성하기 ..'
            : '로그인하고 댓글 작성하기'
        }
        disabled={!session}
        autoFocus={isReplyMode}
      />
    </BaseCommentForm>
  );
};

export default NewCommentForm;
