/* eslint-disable @typescript-eslint/no-empty-function */
import type { Comment } from '@@types/comments';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import * as S from '../CommentForm.style';
import BaseCommentForm from '../BaseCommentForm';
import LoginModal from '@components/Modal/Login/Login';

import useInput from '@hooks/useInput';

import { useCreateComment } from '@api/hooks/Comments/mutation';
import { sendNotificationEmail } from '@api/notificationEmail';
import useLockBodyScroll from '@hooks/useLockBodyScroll';

import { getPostId } from '@components/Comments/Comments.utils';

interface NewCommentFormProps {
  isReplyMode?: boolean;
  setFormToDefaultMode?: () => void;
  comments?: Pick<Comment, 'id'>;
}

const NewCommentForm = ({
  isReplyMode,
  setFormToDefaultMode = () => {},
  comments,
}: NewCommentFormProps) => {
  const { id } = comments ?? {};
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [comment, handleCommentChange, resetInput] =
    useInput<HTMLTextAreaElement>('');
  const { data: session } = useSession();

  const { mutate, isPending } = useCreateComment();
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
        parentId: id,
      },
      {
        onSuccess() {
          resetInput();
          setFormToDefaultMode();
          sendNotificationEmail({ postId, body: comment });
        },
      }
    );
  };

  useLockBodyScroll(isLoginModalVisible);

  const newCommentFormConfig = {
    onSubmit: session ? onCreateComment : () => setIsLoginModalVisible(true),
    isFormModeCancellable: isReplyMode,
    setFormToDefaultMode,
    isSubmitButtonDisabled: isPending,
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
      {isLoginModalVisible && (
        <LoginModal onClose={() => setIsLoginModalVisible(false)} />
      )}
    </BaseCommentForm>
  );
};

export default NewCommentForm;
