import type { Comment } from '@@types/comments';
import * as S from './CommentOptions.style';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import useModal from '@hooks/useModal';
import { useDeleteComment } from '@api/hooks/Comments/mutation';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { getPostId } from '../Comments.utils';
import { sendNotificationEmail } from '@api/notificationEmail';

interface CommentOptionsProps {
  comments: Comment;
  onResetMode: () => void;
  onEditMode: () => void;
  onReplyMode: () => void;
  onCloseCommentOptions: () => void;
}

const CommentOptions = ({
  comments,
  onResetMode,
  onEditMode,
  onReplyMode,
  onCloseCommentOptions,
}: CommentOptionsProps) => {
  const commentOptionsRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const { mutateAsync, isPending } = useDeleteComment();
  const { showModal, closeModal: closeDeleteModal } = useModal();
  const postId = getPostId();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isAuthor = session?.user?.id == comments?.user.id;

  // TODO : see why onSuccess callback doesnt work with mutate
  const onDeleteComment = async () => {
    try {
      await mutateAsync({ id: comments.id, postId });
      closeDeleteModal();
      onResetMode();
      sendNotificationEmail({ postId });
    } catch (e) {
      showModal({ name: 'error' });
    }
  };

  const onCloseOptionsAndShowDeleteModal = () => {
    onCloseCommentOptions();
    showModal({
      name: 'delete_comment',
      props: { onConfirm: onDeleteComment, disabled: isPending },
    });
  };

  useOnClickOutside(commentOptionsRef, onCloseCommentOptions);

  return (
    <S.Container ref={commentOptionsRef}>
      <S.Option onClick={onReplyMode}>답글 작성</S.Option>
      {isAuthor && !comments.isDeleted && (
        <>
          <S.Option onClick={onEditMode}>수정</S.Option>
          <S.Option
            onClick={onCloseOptionsAndShowDeleteModal}
            disabled={isPending}
          >
            삭제
          </S.Option>
        </>
      )}
    </S.Container>
  );
};

export default CommentOptions;
