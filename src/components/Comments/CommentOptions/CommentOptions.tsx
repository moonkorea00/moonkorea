import * as S from './CommentOptions.style';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useSession } from 'next-auth/react';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { CommentProps } from '@@types/comments';

interface CommentOptionsProps {
  comments: CommentProps;
  isDeleting: boolean;
  showDeleteToast: (modalKey: 'delete_comment') => void;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  setIsReplyMode: Dispatch<SetStateAction<boolean>>;
  setIsCommentOptionsVisible: Dispatch<SetStateAction<boolean>>;
}

const CommentOptions = ({
  comments,
  isDeleting,
  showDeleteToast,
  setIsEditMode,
  setIsReplyMode,
  setIsCommentOptionsVisible,
}: CommentOptionsProps) => {
  const commentOptionsRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  useOnClickOutside(commentOptionsRef, () => setIsCommentOptionsVisible(false));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isAuthor = session?.user?.id == comments?.user.id;

  return (
    <S.Container ref={commentOptionsRef}>
      <S.Option
        onClick={() => {
          setIsEditMode(false);
          setIsReplyMode((prev: boolean) => !prev);
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
              setIsEditMode((prev: boolean) => !prev);
              setIsCommentOptionsVisible(false);
            }}
          >
            수정
          </S.Option>
          <S.Option
            onClick={() => {
              setIsCommentOptionsVisible(false);
              showDeleteToast('delete_comment');
            }}
            disabled={isDeleting}
          >
            삭제
          </S.Option>
        </>
      )}
    </S.Container>
  );
};

export default CommentOptions;
