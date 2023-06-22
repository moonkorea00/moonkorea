import type { Dispatch, SetStateAction } from 'react';
import type { CommentProps } from '@@types/comments';
import * as S from './CommentOptions.style';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import useModal from '@hooks/useModal';
import { useDeleteComment } from '@api/hooks/Comments/mutation';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { getPostId } from '../Comments.utils';
import { sendNotificationEmail } from '@api/services/notificationEmail';

interface CommentOptionsProps {
  comments: CommentProps;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setIsReplyMode: Dispatch<SetStateAction<boolean>>;
  setIsCommentOptionsVisible: Dispatch<SetStateAction<boolean>>;
}

const CommentOptions = ({
  comments,
  setIsEditMode,
  setIsReplyMode,
  setIsCommentOptionsVisible,
}: CommentOptionsProps) => {
  const commentOptionsRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const { mutateAsync, isLoading } = useDeleteComment();
  const { showModal, closeModal } = useModal();
  const postId = getPostId();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isAuthor = session?.user?.id == comments?.user.id;

  // TODO : see why onSuccess callback doesnt work with mutate
  const onDeleteComment = async () => {
    try {
      await mutateAsync({ id: comments.id, postId });
      closeModal();
      setIsEditMode(false);
      setIsReplyMode(false);
      sendNotificationEmail({ postId });
    } catch (e) {
      showModal({ name: 'error' });
    }
  };

  useOnClickOutside(commentOptionsRef, () => setIsCommentOptionsVisible(false));

  return (
    <S.Container ref={commentOptionsRef}>
      <S.Option
        onClick={() => {
          setIsEditMode(false);
          setIsReplyMode(true);
          setIsCommentOptionsVisible(false);
        }}
      >
        답글 작성
      </S.Option>
      {isAuthor && !comments.isDeleted && (
        <>
          <S.Option
            onClick={() => {
              setIsReplyMode(false);
              setIsEditMode(true);
              setIsCommentOptionsVisible(false);
            }}
          >
            수정
          </S.Option>
          <S.Option
            onClick={() => {
              setIsCommentOptionsVisible(false);
              showModal({
                name: 'delete_comment',
                props: { onConfirm: onDeleteComment, disabled: isLoading },
              });
            }}
            disabled={isLoading}
          >
            삭제
          </S.Option>
        </>
      )}
    </S.Container>
  );
};

export default CommentOptions;
