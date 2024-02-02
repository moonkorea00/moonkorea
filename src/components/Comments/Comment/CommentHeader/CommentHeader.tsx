import type { Comment } from '@@types/comments';

import { useState } from 'react';
import Image from 'next/image';

import * as S from './CommentHeader.style';
import CommentOptions from '@components/Comments/CommentOptions/CommentOptions';
import OutsideClickWrapper from '@components/common/OutsideClickWrapper/OutsideClickWrapper';

import {
  formatDateToElapsedTime,
  isEdittedAndNotDeleted,
} from '@components/Comments/Comments.utils';
import { assets } from '@utils/assetsPath';

interface CommentHeaderProps {
  comments: Comment;
  onResetMode: () => void;
  onEditMode: () => void;
  onReplyMode: () => void;
}

const CommentHeader = ({
  comments,
  onResetMode,
  onEditMode,
  onReplyMode,
}: CommentHeaderProps) => {
  const { isDeleted, user, createdAt } = comments;
  const [isCommentOptionsVisible, setIsCommentOptionsVisible] = useState(false);

  const onCloseCommentOptions = () => setIsCommentOptionsVisible(false);
  return (
    <S.CommentHeader>
      <div>
        <S.Author>{isDeleted ? '알 수 없음' : user.name}</S.Author>
        <S.PublishDate>
          {formatDateToElapsedTime(createdAt)}{' '}
          {isEdittedAndNotDeleted(comments) && '(수정됨)'}
        </S.PublishDate>
      </div>
      <OutsideClickWrapper
        onClickHandler={onCloseCommentOptions}
        triggerKey="Escape"
      >
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
      </OutsideClickWrapper>
    </S.CommentHeader>
  );
};

export default CommentHeader;
