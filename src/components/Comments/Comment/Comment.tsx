import type { CommentProps } from '@@types/comments';
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

const Comment = ({ comments }: { comments: CommentProps }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [isCommentOptionsVisible, setIsCommentOptionsVisible] = useState(false);

  return (
    <S.Container parentId={comments?.parentId as string} depth={comments.depth}>
      <S.FlexWrapContainer>
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
          <S.CommentInformation>
            <div>
              <S.User>
                {comments.isDeleted ? '알 수 없음' : comments?.user?.name}
              </S.User>
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
                setIsEditMode={setIsEditMode}
                setIsReplyMode={setIsReplyMode}
                setIsCommentOptionsVisible={setIsCommentOptionsVisible}
              />
            )}
          </S.CommentInformation>
          {isEditMode ? (
            <EditCommentForm
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              comments={comments}
            />
          ) : (
            <S.Content isDeleted={comments.isDeleted}>
              {comments.isDeleted ? '삭제된 댓글입니다.' : comments.body}
            </S.Content>
          )}
          {isReplyMode && (
            <NewCommentForm
              isReplyMode={isReplyMode}
              setIsReplyMode={setIsReplyMode}
              comments={comments}
            />
          )}
        </S.ContentContainer>
      </S.FlexWrapContainer>
      {comments?.children?.length > 0 && (
        <CommentList comments={comments.children} />
      )}
    </S.Container>
  );
};

export default Comment;
