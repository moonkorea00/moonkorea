import type { Comment } from '@@types/comments';

import { useSession } from 'next-auth/react';

import * as S from './CommentOptions.style';

import { useToastContext } from '@context/Toast';

import { useDeleteComment } from '@api/hooks/Comments/mutation';
import { sendNotificationEmail } from '@api/notificationEmail';

import { getPostId } from '../Comments.utils';
import { TOAST } from '@components/Modal/Toast/toast.utils';

interface CommentOptionsProps {
  comments: Pick<Comment, 'id' | 'user' | 'isDeleted'>;
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
  const { id, user, isDeleted } = comments;
  const { data: session } = useSession();

  const toast = useToastContext();
  const { mutateAsync, isPending } = useDeleteComment();
  const postId = getPostId();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isAuthor = session?.user?.id == user.id;

  // TODO : see why onSuccess callback doesnt work with mutate
  const onDeleteComment = async () => {
    try {
      await mutateAsync({ id, postId });
      onResetMode();
      sendNotificationEmail({ postId });
    } catch (e) {
      toast.show(TOAST.ERROR);
    }
  };

  return (
    <S.Container onClick={onCloseCommentOptions}>
      <S.Option onClick={onReplyMode}>답글 작성</S.Option>
      {isAuthor && !isDeleted && (
        <>
          <S.Option onClick={onEditMode}>수정</S.Option>
          <S.Option
            onClick={() =>
              toast.show({
                ...TOAST.DELETE_COMMENT,
                onConfirm: onDeleteComment,
              })
            }
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
