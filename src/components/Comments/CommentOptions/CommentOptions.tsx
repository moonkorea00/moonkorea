import type { Comment } from '@@types/comments';
import { useSession } from 'next-auth/react';

import * as S from './CommentOptions.style';
import OutsideClickWrapper from '@components/common/OutsideClickWrapper/OutsideClickWrapper';

import useModal from '@hooks/useModal';

import { useDeleteComment } from '@api/hooks/Comments/mutation';
import { sendNotificationEmail } from '@api/notificationEmail';

import { getPostId } from '../Comments.utils';

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

  return (
    <OutsideClickWrapper
      onClickHandler={onCloseCommentOptions}
      triggerKey="Escape"
    >
      <S.Container>
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
    </OutsideClickWrapper>
  );
};

export default CommentOptions;
