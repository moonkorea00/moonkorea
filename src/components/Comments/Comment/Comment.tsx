import * as S from './Comment.style';
import { useState } from 'react';
import Image from 'next/image';
import { CommentProps } from '@@types/comments';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';
import useDeleteComment from '../hooks/useDeleteComment';
import { formatDateToElapsedTime, isEdittedComment } from '../Comments.utils';
import Portal from '@components/Modal/Portal';
import CommentOptions from '../CommentOptions/CommentOptions';

const Comment = ({ comments }: { comments: CommentProps }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [isCommentOptionsVisible, setIsCommentOptionsVisible] = useState(false);

  const isEditted = isEdittedComment(comments);

  const {
    deleteToastConfig,
    showModal: showDeleteToast,
    closeDeleteToast,
    onDeleteComment,
    isDeleting,
  } = useDeleteComment(comments);

  return (
    <S.Container parentId={comments?.parentId as string} depth={comments.depth}>
      <S.FlexWrapContainer>
        <S.AvatarContainer>
          <S.Avatar
            src={
              comments.isDeleted
                ? '/assets/Comments/abstract-user-flat-4.svg'
                : comments.user.image ||
                  '/assets/Comments/abstract-user-flat-4.svg'
            }
            alt="avatar"
          />
        </S.AvatarContainer>
        <S.ContentContainer>
          <S.UpperContainer>
            <div>
              <S.User>
                {comments.isDeleted ? '알 수 없음' : comments?.user?.name}
              </S.User>
              <S.PublishDate>
                {formatDateToElapsedTime(comments.createdAt)}{' '}
                {isEditted && !comments.isDeleted && '(수정됨)'}
              </S.PublishDate>
            </div>
            <S.OptionsButton
              onClick={() => setIsCommentOptionsVisible(prev => !prev)}
            >
              <Image
                src="/assets/Comments/option-dots.svg"
                alt="옵션"
                width={30}
                height={30}
              />
            </S.OptionsButton>
            {isCommentOptionsVisible && (
              <CommentOptions
                comments={comments}
                isDeleting={isDeleting}
                showDeleteToast={showDeleteToast}
                setIsEditMode={setIsEditMode}
                setIsReplyMode={setIsReplyMode}
                setIsCommentOptionsVisible={setIsCommentOptionsVisible}
              />
            )}
          </S.UpperContainer>
          {isEditMode ? (
            <CommentForm
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              comments={comments}
              type="edit"
            />
          ) : (
            <S.Content isDeleted={comments.isDeleted}>
              {comments.isDeleted ? '삭제된 댓글입니다.' : comments.body}
            </S.Content>
          )}
          {isReplyMode && (
            <CommentForm
              isReplyMode={isReplyMode}
              setIsReplyMode={setIsReplyMode}
              comments={comments}
              type="new_comment"
            />
          )}
        </S.ContentContainer>
      </S.FlexWrapContainer>
      {comments?.children?.length > 0 && (
        <CommentList comments={comments.children} />
      )}
      {deleteToastConfig && (
        <Portal
          modalConfig={deleteToastConfig}
          onConfirm={onDeleteComment}
          onClose={closeDeleteToast}
        />
      )}
    </S.Container>
  );
};

export default Comment;
