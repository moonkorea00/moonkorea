import type { Comment as IComment } from '@@types/comments';
import * as S from './Comment.style';
import { useState } from 'react';
import Image from 'next/image';
import EditCommentForm from '../CommentForm/EditCommentForm';
import NewCommentForm from '../CommentForm/NewCommentForm';
import CommentList from '../CommentList/CommentList';
import CommentOptions from '../CommentOptions/CommentOptions';
import {
  formatDateToElapsedTime,
  checkIfIsEdittedComment,
} from '../Comments.utils';
import { assets } from '@utils/assetsPath';

interface CommentProps {
  comments: IComment;
}

enum CommentMode {
  View = 'VIEW',
  Edit = 'EDIT',
  Reply = 'REPLY',
}

const Comment = ({ comments }: CommentProps) => {
  const [mode, setMode] = useState(CommentMode.View);
  const [isCommentOptionsVisible, setIsCommentOptionsVisible] = useState(false);

  const onCloseCommentOptions = () => setIsCommentOptionsVisible(false);

  const onResetMode = () => setMode(CommentMode.View);

  const onEditMode = () => {
    onCloseCommentOptions();
    setMode(CommentMode.Edit);
  };

  const onReplyMode = () => {
    onCloseCommentOptions();
    setMode(CommentMode.Reply);
  };

  return (
    <S.Container parentId={comments?.parentId as string} depth={comments.depth}>
      <S.CommentContainer>
        <S.AvatarContainer>
          <S.Avatar
            src={
              comments.isDeleted
                ? assets.defaultUserAvatar
                : comments.user.image || assets.defaultUserAvatar
            }
            alt="avatar"
          />
        </S.AvatarContainer>
        <S.ContentContainer>
          <S.CommentHeader>
            <div>
              <S.Author>
                {comments.isDeleted ? '알 수 없음' : comments?.user?.name}
              </S.Author>
              <S.PublishDate>
                {formatDateToElapsedTime(comments.createdAt)}{' '}
                {checkIfIsEdittedComment(comments) &&
                  !comments.isDeleted &&
                  '(수정됨)'}
              </S.PublishDate>
            </div>
            <S.OptionsButton
              onClick={() => setIsCommentOptionsVisible(prev => !prev)}
            >
              <Image src={assets.options} alt="옵션" width={30} height={30} />
            </S.OptionsButton>
            {isCommentOptionsVisible && (
              <CommentOptions
                comments={comments}
                onResetMode={onResetMode}
                onEditMode={onEditMode}
                onReplyMode={onReplyMode}
                onCloseCommentOptions={onCloseCommentOptions}
              />
            )}
          </S.CommentHeader>
          <S.CommentBody isDeleted={comments.isDeleted}>
            {comments.isDeleted ? '삭제된 댓글입니다.' : comments.body}
          </S.CommentBody>
          {mode === CommentMode.Edit && (
            <EditCommentForm
              comments={comments}
              isEditMode={mode === CommentMode.Edit}
              setFormToDefaultMode={onResetMode}
            />
          )}
          {mode === CommentMode.Reply && (
            <NewCommentForm
              comments={comments}
              isReplyMode={mode === CommentMode.Reply}
              setFormToDefaultMode={onResetMode}
            />
          )}
        </S.ContentContainer>
      </S.CommentContainer>
      {comments?.children?.length > 0 && (
        <CommentList comments={comments.children} />
      )}
    </S.Container>
  );
};

export default Comment;
