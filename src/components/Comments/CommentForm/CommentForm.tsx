import * as S from './CommentForm.style';
import { Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import Portal from '@components/Modal/Portal';
import { CommentProps } from '@@types/comments';
import useModal from '@components/Modal/hooks/useModal';
import useCreateComment from '../hooks/useCreateComment';
import useEditComment from '../hooks/useEditComment';
import { MODAL_CONFIG } from '@components/Modal/Modal.utils';

interface CommentFormProps {
  isReplyMode?: boolean;
  isEditMode?: boolean;
  setIsEditMode?: Dispatch<SetStateAction<boolean>>;
  setIsReplyMode?: Dispatch<SetStateAction<boolean>>;
  comments?: CommentProps;
  type: 'new_comment' | 'edit';
}

const CommentForm = ({
  isReplyMode,
  isEditMode,
  setIsEditMode,
  setIsReplyMode,
  comments,
  type,
}: CommentFormProps) => {
  const { modalConfig: loginConfig, showModal, closeModal } = useModal();
  const { data: session } = useSession();

  const { comment, handleComment, onCreateComment, isSubmitting } =
    useCreateComment(
      comments as CommentProps,
      setIsReplyMode as Dispatch<SetStateAction<boolean>>,
      type,
      isReplyMode
    );

  const {
    edittedComment,
    handleEditComment,
    onEditComment,
    isSubmittingEdittedComment,
  } = useEditComment(
    comments as CommentProps,
    setIsEditMode as Dispatch<SetStateAction<boolean>>
  );

  return (
    <S.Container>
      <form
        onSubmit={e => {
          e.preventDefault();
          session
            ? type === 'new_comment'
              ? onCreateComment()
              : onEditComment()
            : showModal(MODAL_CONFIG.LOGIN);
        }}
      >
        {type === 'new_comment' && (
          <S.Input
            value={comment}
            onChange={handleComment}
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
        )}
        {type === 'edit' && (
          <S.EditInput
            defaultValue={edittedComment as string}
            onChange={handleEditComment}
            autoFocus={isEditMode}
          />
        )}
        <S.ButtonContainer>
          {(isEditMode || isReplyMode) && (
            <S.SubmitButton
              onClick={() => {
                setIsEditMode && setIsEditMode(false);
                setIsReplyMode && setIsReplyMode(false);
              }}
            >
              취소
            </S.SubmitButton>
          )}
          <S.SubmitButton
            type="submit"
            disabled={isSubmitting || isSubmittingEdittedComment}
          >
            {session
              ? isReplyMode
                ? '답글 작성'
                : isEditMode
                ? '수정'
                : '댓글 작성'
              : '간편 로그인'}
          </S.SubmitButton>
        </S.ButtonContainer>
      </form>
      {loginConfig && <Portal modalConfig={loginConfig} onClose={closeModal} />}
    </S.Container>
  );
};

export default CommentForm;
